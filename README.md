> [!NOTE]
> I accept help to make the version of the other programming languages.

# Multiform-validator

[![npm version](https://badge.fury.io/js/multiform-validator.svg)](https://badge.fury.io/js/multiform-validator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm downloads](https://img.shields.io/npm/dm/multiform-validator.svg?style=flat-square)](https://npm-stat.com/charts.html?package=multiform-validator)

This npm package provides JavaScript functions to validate various forms fields.

Documentation: https://multiformvalidator.netlify.app

Feel free to find bugs and report them to me. Your feedback is highly appreciated. Hugs from Gabriel Logan!

## CDNs

### ESM:

jsDelivr:

```bash
https://cdn.jsdelivr.net/npm/multiform-validator@2.6.0/+esm
```

```html
<script type="module">
	import multiform-validator from "https://cdn.jsdelivr.net/npm/multiform-validator@2.6.0/+esm"
</script>
```

### CJS:

unpkg:

```bash
https://unpkg.com/multiform-validator@2.6.0/dist/index.js
```

```html
<script src="https://unpkg.com/multiform-validator@2.6.0/dist/index.js"></script>
```

### Example of use with CDN

using cjs:

```html
<script src="https://unpkg.com/multiform-validator@2.6.0/dist/index.js"></script>
<script>
	const emailResult = isEmail("123456");
	const cpfResult = cpfIsValid("123456");

	console.log(emailResult); // returns false
	console.log(cpfResult.isValid); // returns false
</script>
```
or

using esm:

```html
<script type="module">
	import mv from "https://cdn.jsdelivr.net/npm/multiform-validator@2.6.0/+esm";
	const emailResult = mv.isEmail("123456");
	const cpfResult = mv.cpfIsValid("123456");

	console.log(emailResult); // returns false
	console.log(cpfResult.isValid); // returns false
</script>
```

## Installation

```bash
npm install multiform-validator
```

or

```bash
yarn add multiform-validator
```

or

```bash
pnpm add multiform-validator
```

## Data Validator

This package contains various modules for validating different types of data. Below are the available validation modules:

## Available Validation Modules

- **cnpjValidator**: CNPJ validation.
- **cpfValidator**: CPF validation.
- **getOnlyEmail**: Extracts only the email or emails address from a string.
- **identifyFlagCard**: Identifies the flag of a credit card.
- **isAscii**: Checks if the string contains only ASCII characters.
- **isBase64**: Checks if the string is a valid Base64 encoding.
- **isCEP**: CEP validation (Brazilian postal code).
- **isCreditCardValid**: Credit card validation.
- **isDate**: Date format validation.
- **isDecimal**: Checks if the number is a decimal.
- **isEmail**: Email address validation format.
- **isEmpty**: Checks if the string is empty.
- **isMACAddress**: MAC address validation.
- **isMD5**: Checks if the string is a valid MD5 hash.
- **isNumber**: Checks if the value is a number.
- **isPort**: Port number validation.
- **isPostalCode**: Postal code validation.
- **isTime**: Time format validation.
- **isValidAudio**: Audio file validation.
- **isValidImage**: Image file validation.
- **isValidPdf**: Pdf file validation.
- **isValidTxt**: Txt file validation.
- **isValidVideo**: Video file validation.
- **passwordStrengthTester**: Password strength test.
- **validateBRPhoneNumber**: Brazilian phone number validation.
- **validateEmail**: Email address full validation.
- **validateName**: Name validation.
- **validatePassword**: Password validation.
- **validatePassportNumber**: Passport number validation.
- **validatePhoneNumber**: Phone number validation.
- **validateSurname**: Surname validation.
- **validateTextarea**: Textarea validation.
- **validateUsername**: Username validation.
- **validateUSPhoneNumber**: US phone number validation.

### You can use it in React Native, Angular, any javascript framework or any javascript or typescript code.

#### Example using Reactjs:

![Example using Reactjs](https://raw.githubusercontent.com/Multiform-Validator/docs/main/images/exampleWithReactjs.png)
![Showing error options](https://raw.githubusercontent.com/Multiform-Validator/docs/main/images/options.png)
![Showing error in browser](https://raw.githubusercontent.com/Multiform-Validator/docs/main/images/showErro.png)

### For better information, read the documentation

```javascript
const mv = require("multiform-validator");
// or
import mv from "multiform-validator";

or;

// Attention, FUNCTION_NAME is not a valid function name! It is just an example of how to import the functions.

const { FUNCTION_NAME } = require("multiform-validator");
// or
import { FUNCTION_NAME } from "multiform-validator";
```

## Documentation

### https://multiformvalidator.netlify.app

Feel free to explore the various functions and experiment with different inputs to understand their behavior. If you encounter any issues or have suggestions, don't hesitate to reach out to me. Your feedback is valuable and helps improve the package. Happy coding!

If you want to help me, you can buy me a coffee (:

<p align="center">
	<a href="https://www.buymeacoffee.com/gabriellogan" target="_blank">
		<img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" >
	</a>
</p>

# By - Gabriel Logan
