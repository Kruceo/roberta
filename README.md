# Roberta: Node Project Configurator 

**Roberta** is a Node project configurator that simplifies the process of managing project configurations. It allows you to easily read, modify, and save configuration settings in a specified file. With Roberta, you can streamline your configuration management in Node.js projects. 

## Installation 

To use Roberta in your Node.js project, install it using npm: 

```bash 
npm install roberta 
``` 

## Usage 

Import the `Configurator` class from 'roberta' and create an instance of it, specifying the configuration file. You can then use the `set`, `get`, and `getOrCreate` methods to manage your project's configuration. 

```javascript 
import { Configurator } from 'roberta'; 

// Create a new Configurator instance with the specified file 
const cfg = new Configurator({ file: 'config.txt' }); 

// Set a configuration value 
cfg.set('test', 'steel test'); 

// Get a configuration value 
const testValue = cfg.get('test'); 

// Get a configuration value or create it with a default value 
const otherTestValue = cfg.getOrCreate('othertest', 'my default value hehe'); 
``` 

In this example, the configuration settings are saved in the 'config.txt' file with the following format: 

```plaintext 
test=steel test 
othertest=my default value hehe 
``` 

These configurations can be easily managed using the intuitive methods provided by Roberta. 

Feel free to incorporate Roberta into your Node.js projects to streamline your configuration management. 

## Contributing 

If you encounter issues or have suggestions for improvements, please feel free to open an [issue](https://github.com/your/repository/issues) or submit a [pull request](https://github.com/your/repository/pulls) on GitHub. 

## Author 

- [Website](https://kruceo.com)
- [Donate](https://kruceo.com/donate)