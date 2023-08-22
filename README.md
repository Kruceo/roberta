# Roberta

My Configuration Library is a lightweight JavaScript library designed to simplify the management of configuration files with a custom syntax. This library provides an intuitive interface for reading and modifying configuration values within a configuration file.

## Installation

You can install the library using npm:

```bash
npm install roberta
```

## Usage

### Initialization

To use the library, import the `Configurator` class and create an instance by specifying the configuration file's name.

```javascript
const { Configurator } = require('my-configuration-library');

const cfg = new Configurator({ file: 'my-cfg.cfg' });
```

### Get Method

Retrieve values from the configuration file using the `get` method. You can provide a default value to be returned if the key doesn't exist.

```javascript
const month = cfg.get('month'); // Returns the value if 'month' key exists
const year = cfg.get('year', 2023); // Returns 2023 if 'year' key doesn't exist
```

**Effect on Configuration File:**

If the provided key exists in the configuration file, the `get` method returns the corresponding value. If the key doesn't exist, the method returns the default value provided. The configuration file will be changed with the value;

### Set Method

Set new values in the configuration file using the `set` method.

```javascript
cfg.set('person', {name:'Lian',nick:'AFKplayer'})
```

**Effect on Configuration File:**

The `set` method updates or adds the specified key with the provided value in the configuration file. If the key already exists, its value is updated. If the key doesn't exist, it is added to the configuration file with the provided value.

### Configuration File Syntax

The configuration file follows a custom syntax with annotated values:

```
string=a normal string
number=@number{2002}
object=@object{[{"name":"test"}]}
boolean=@boolean{false}

```