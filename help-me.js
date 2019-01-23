// Clear console
process.stdout.write('\033c');
console.log('Hack day!');
const
  { spawnSync } = require('child_process'),
  fs = require('fs');
const writeFile = (fileName, content) => fs.writeFileSync(`./file/${fileName}`, content, err => err && console.error(err));

// read the messages
const messageList = JSON.parse(fs.readFileSync(__dirname + '/message-list.json', 'utf8'));

// read files from the file directory
const fileList = fs.readdirSync(__dirname + '/file/');

// I want to have a 10% chance to create and the rest to update files
const createOrUpdate = () => ~~(Math.random() * 10) <= 1
const argumentList = process.argv

// Generate 1 year of dates
const numberOfDays = argumentList[2] && +argumentList[2] || 5

Array(numberOfDays).fill().map((v, k) => {
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  const randomNumber = ~~(Math.random() * 6 + 1);

  const dayInThePast = new Date(today.setDate(today.getDate() - k + 1));

  Array(randomNumber).fill().forEach((v, h) => {
    const niceRandomDateAndTime = new Date(dayInThePast.setTime(dayInThePast.getTime() + (~~(Math.random() * 3600)) * 1000)).toString();
    writeFile('date.md', `# Hi, How are you today?
${niceRandomDateAndTime}`);
    // var ls = spawnSync( 'git', [ 'add', '.' ] );
    // git commit --amend --no-edit --date "Mon 8 Oct 2018 12:11:31 BST"
    var ls = spawnSync('git', ['commit', '-am', messageList[Math.floor(Math.random() * (messageList.length - 1))].about]);
    var ls = spawnSync('git', ['commit', '--amend', '--no-edit', '--date', niceRandomDateAndTime]);
    // console.log( `stderr: ${ls.stderr.toString()}` );
    // console.log( `stdout: ${ls.stdout.toString()}` );
  });
  if (k % 10 === 0) {
    spawnSync('git', ['push', '-f']);
  }
});



