import path from 'path'
import fs from 'fs'

const defaultOptions = {
    file: "project.conf"
}

class Parser{
    constructor(name,process){
        this.name = name

        this.process = process
    }

    get exp(){
        return new RegExp("^@"+this.name + '\\{.*\\}$')
    }

    parse(value){
        let v = value.slice(2 + this.name.length,value.length -1)

        if(this.process)
        v = this.process(v)
        return v
    }
    translate(value){
        return `@${this.name}{${value}}`
    }
}

const typeParsers = [
    new Parser('json',(v)=>JSON.parse(v)),
    new Parser('number',(v)=>parseFloat(v)),
    new Parser('sla',(v)=>JSON.parse(v)),
    new Parser('sla',(v)=>JSON.parse(v)),
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
            newFile += each[0]+"="+each[1]+"\n"
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
}

