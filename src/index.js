require('dotenv').config();
const fetch = require('node-fetch');
const Discord = require('discord.js');
const client = new Discord.Client();

const checkCommand = (msg,msgChannelID) => {
  switch(msg){
    case "hw":
      console.log('homeowrk will go here');
      break;
    default:
      console.log('idk yet lol');
  }
}

let assignmentCall = async (courses)=>{
  let courseArray = [];
  for (course of courses){
    const canvasApiUrl = `https://canvas.instructure.com/api/v1/courses/${course.courseID}/assignments?access_token=${process.env.SDT1_TOKEN}`;
    const fetchResponse = await fetch(canvasApiUrl);
    const json = await fetchResponse.json();
    courseArray.push(json);
  }
  return courseArray;
}

let fetchAssignments = () =>{
  const courses = [
    {course: 'IT 211',courseID:'90000002053946'},
    {course: 'IT 121',courseID:'90000002033847'},
    {course: 'BTM 260',courseID:'90000002033843'},
    {course: 'BTM 113',courseID:'90000002033839'},
    {course: 'BTM 100',courseID:'90000001977201'}
  ]

  assignmentCall(courses).then(v=>{
    let assignmentArray = []
    const d = new Date;
  
    for (let i=0; i<v.length; i++){
      for(assignment of v[i]){
        if(Date.parse(assignment.due_at)>Date.parse(d.toISOString())){
          assignmentArray.push(
          {assignmentName:assignment.name,
          url:assignment.html_url,
          dueDate:assignment.due_at}
          )
        }
      }
    }
    console.log(assignmentArray);
    // return assignmentArray
  }).catch(err=>console.log(err))

}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if(msg.channel.id === '590313696492912801' && !msg.author.bot){
    console.log(msg.content);
    msg.channel.send(`fuck you <@${msg.author.id}>`);
  }
})
fetchAssignments();
client.login(process.env.DISCORD_TOKEN);