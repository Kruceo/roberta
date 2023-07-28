export class Parser{
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