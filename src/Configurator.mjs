import path from 'path'
import fs from 'fs'

const DEFAULT_OPTIONS = { file: 'project.conf' }

class Configurator {
    /**
     * Creates a managed configuration file.
     * @param {DEFAULT_OPTIONS} options 
     */
    constructor(options) {
        const opt = { ...DEFAULT_OPTIONS, ...options }

        this.configFile = path.resolve(opt.file)
        this.configFolder = path.resolve(this.configFile, '../')

        if (!fs.existsSync(this.configFile)) fs.writeFileSync(this.configFile, "")
    }

    /**
     * Returns the requested key value.
     * @param {string} key 
     * @returns {string}
     */
    get(key) {
        const value = this.getFileAsObject()[key]
        return value
    }

    /**
     * Write a value for this key in the configuration file.
     * @param {string} key 
     * @param {string} value 
     */
    set(key, value) {
        var obj = this.getFileAsObject()
        obj[key] = Configurator.normalizeStr(value)

        var newFile = ''
        Object.entries(obj).forEach(each => {
            const [key, value] = each
            newFile += `${key}=${Configurator.normalizeStr(value)}\n`
        })
        fs.writeFileSync(this.configFile, newFile)
    }
    remove(key){
        var obj = this.getFileAsObject()
        var newFile = ''
        Object.entries(obj).forEach(each => {
            const [k, v] = each
             console.log(k,key,key==k)
            if(key==k)return;
            newFile += `${k}=${Configurator.normalizeStr(v)}\n`
        })
        fs.writeFileSync(this.configFile,newFile)
    }

    /**
     * Normalize strings to not corrupt the configuration file.
     * @param {string} text 
     * @returns {string}
     */
    static normalizeStr(text){
        return (text+"").replace(/\n/g, "\\n")
    }

    /**
     * If the requested key not exist, this will write the config file with a default value.
     * @param {string} key 
     * @param {string} defaultValue 
     * @returns {string}
     */
    getOrCreate(key, defaultValue) {
        var value = this.get(key)
        if (value) return value
        this.set(key, defaultValue)
        return defaultValue
    }

    getFileAsObject() {
        const content = fs.readFileSync(this.configFile, "utf-8")
        var obj = {}

        content.split("\n").forEach(line => {
            const [key, value] = line.split("=", 2)
            if (!key | !value) return;
            obj[key] = value.replace(/\\n/g, "\n")
        })

        return obj
    }
}

export default Configurator