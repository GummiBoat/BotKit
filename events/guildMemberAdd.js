exports.run = (client, member) => {
  member.send('**Welcome to the Gamekit Discord!**'
            + '\n\nHere you can receive Support and chat with your fellow Gamekitters!'
            + '\nYou can also link your Gamekit Account to your Discord Account, by typing `>verify`'
            + '\n*Want to know what the benefits are for linking? Read <#424543613490561025>!*'
            + '\n\n**Please follow our rules!** You can see them over at <#424543526597165056>'
            + '\n\nThank you for your attention and have fun :)').catch(console.error);
}
