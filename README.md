# passitive-cli
Custom password management system for your personal use.

This tool first ecrypts then saves it into your local computer. When you want the password back, enter: `pass <account>` then the password gets decrypted and put into your clipboard for 8 seconds.

## Usage

On your terminal:
```sh
  > ms <site> <query>
```

Examples queries:
```sh
  > pass <account> <password>
  > pass <account>       (puts decrypted password into your clipboard)
  > pass <path> -j       (to ecrypt all password from a json file)
  > pass -c              (to delete all accounts and passwords)
  > pass <account> -d    (to delete that account and password)
  > pass -p              (to get the path where your encrypted passwords are)
```

## Installation
To use the tool, you can either install it glabally:
```sh
> npm install -g passitive-cli
```

Or use (if you want to hack a little bit):
```sh
npm link
```
> Use sudo at the beginning if you are getting permissions issues. Both ways will allow you to run the command anywhere.

## Set up (important)


# Demo

![](http://g.recordit.co/.gif)

### Raison D'etre
Managing passwords is already super hard and still they are one of the best means when it comes to dealing with authentification. But there is a constant dilemma between `ease of use` and security. The advantage is that using a custom encryption/decryption is much more secure than using popular password mangament tools as they attract more attention. 

## License
MIT © [Mohamed Hayibor](http://github.com/mohamedhayibor)