# passitive-cli
Custom password management system for personal use. 

![](http://g.recordit.co/WUgip0vkkn.gif)

This tool first ecrypts then saves it into your local computer. When you want the password back, enter: `pass <account>` then the password gets decrypted and put into your clipboard for 8 seconds.

## Risk

For learning purposes. Use at your own risk.

## Usage

Examples queries:
```sh
  > pass <account> <password> (encrypt account password)
  > pass <account>            (puts decrypted password into your clipboard)
  > pass <path> -j            (to ecrypt all password from a json file)
  > pass <account> -d         (to delete that account and password)
  > pass -p                   (to get the path where your encrypted passwords are)
```

## Installation

Go to whatever directory you want to install it on.

```sh
> git clone https://github.com/mohamedhayibor/passitive-cli.git
> npm link
```
> npm link allows you run the command anywhere. It allows you to run the command anywhere. Use sudo at the beginning if you are getting permissions issues.

## Set up (important)

For your Master key:

1. create `.env` file (at root of repo)
2. then edit it like so:
```
MASTER_KEY="whatever master key, preferably long, annoying to read and personal..."
```
Feel free to hack it to your own needs.

If you are using bash, your default set up will record every command you pass to the terminal and you certainly don't want that in this case. [Disable the recording](https://stackoverflow.com/questions/18663078/disable-history-in-linux).

## License
MIT © [Mohamed Hayibor](http://github.com/mohamedhayibor)
