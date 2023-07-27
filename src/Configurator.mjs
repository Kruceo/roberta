import path from 'path'
import fs from 'fs'

const defaultOptions = {
    file: "project.conf"
}

class Parser{
    constructor(type,process){
        this.type = type

        this.process = process
    }

    get exp(){
        return new RegExp("^@"+this.type + '\\{.*\\}$')
    }

    parse(value){
        let v = value.slice(2 + this.type.length,value.length -1)

        if(this.process)
        v = this.process(v)
        return v
    }
    translate(value){
        return `@${this.type}{${value}}`
    }
}

const typeParsers = [
    new Parser('object',(v)=>JSON.parse(v)),
    new Parser('number',(v)=>parseFloat(v)),
    new Parser('boolean',(v)=>v=="true"?true:false),
    new Parser('regex',(v)=>new RegExp(v)),
]

export default class Configurator {
    constructor(options) {
        const opt = options ?? defaultOptions
        this.configFile = path.resolve(opt.file)
        this.configPath = path.resolve(this.configFile, '../')

        if(!fs.existsSync(this.configPath))fs.mkdirSync(this.configPath,{recursive})
        if(!fs.existsSync(this.configFile))fs.writeFileSync(this.configFile,'')
    }
    get(key,defaultValue){
        let obj = this.getFileObj()
        let selection = null
        if(!obj[key]){
            if(defaultValue){
                this.addToFile(key,defaultValue)
                selection = defaultValue
            }
            else return selection;
        }
        else selection = obj[key]
    
        selection = this.parseType(selection)

        return selection
    }

    getFileObj(){
        let file = fs.readFileSync(this.configFile,'utf-8')
        let obj = {}
        file.split('\n').forEach(line=>{
            const indexOfEq = line.indexOf('=')
            let key = line.slice(0,indexOfEq)
            let value = line.slice(indexOfEq+1,line.length)
            obj[key] = value
        })
        return obj
    }
    addToFile(key,value){
        let file = fs.readFileSync(this.configFile,'utf-8')
        let newFile = ''
        let obj = this.getFileObj()
        obj[key] = value

        Object.entries(obj).forEach(each=>{
            
            if(each[0]=='')return;
            let v = this.translateToType(each[1])
            newFile += each[0]+"="+v+"\n"
        })
        fs.writeFileSync(this.configFile,newFile)
    }

    parseType(value){
        if(typeof(value) != 'string')return value;

        let selection = value

        for (const parser of typeParsers) {
            if(parser.exp.test(value)){
                selection = parser.parse(value)
                break
            }
           
        }

        return selection
    }
    translateToType(value){

        let type = typeof(value)

        let selection = value

        for (const parser of typeParsers) {
            if(parser.type == type){
                selection = parser.translate(value)
                break
            }
        }

        return selection
    }
}

let config = new Configurator()

console.log(config.get('gestes',123456))

fs.writeFileSync('teste.json','')