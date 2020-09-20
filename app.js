//파일 저장할 위치
const path = "/storage/emulated/0/katalkbot/db/";

let learnArr = new Array();

//메세지 함수
function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) 
{    
    //관리자 지정함수
    defaultMessege(msg, replier, sender);

    //봇 리로드 : 관리자만 가능
    if(msg === '@boot') 
    {
        if(sender !== '고재범') replier.reply('관리자 권한이 없습니다.');
        else bootStrap(replier);
    }

     //봇 학습   
    if(msg.indexOf('@학습 ') !== -1) botIsLearn(msg, replier);

    //봇 학습 내용 감시, 일치값이 있으면 실행
    if(learnArr.length !== 0) observerStudyData(msg, replier);

    //학습목록 보이기
    if(msg === '@학습목록') learnLog(replier);

    

}



function bootStrap(replier)
{
    try
    {
        Api.off();
        Api.reload();
        Api.on();
        replier.reply('⚙ Bot Is Reloaded ⚙');
    }catch(error)
    {
        replier.reply(error);
    }
}

function botIsLearn(msg, replier)
{
    let data = msg.substr(3);

    let req = data.split(":")[0].trim();
    let res = data.split(":")[1].trim();

    learnArr.push({ "req" : req , "res":res });

    replier.reply('[ '+req+' ] 이라고 말하면 [ '+res+' ] (이)라고 답할께요⚡');
}

function observerStudyData(msg, replier)
{   
    for(let i = 0; i < learnArr.length; i++)
    {
        if(msg === learnArr[i].req)
        {
            replier.reply(learnArr[i].res);
        }
    }
}

function learnLog(replier)
{
    let content = '<학습목록>\n------------------------------------\n';
    for(let i = 0; i < learnArr.length; i++)
    {
        content += (i+1) +": "+learnArr[i].req + " / " + learnArr[i].res +"\n";
    }
    replier.reply(content);
}



function defaultMessege(msg, replier, sender)
{
    let arr = ['안녕','방가','ㅋ','뭐함','ㅇㅇ','그치','ㅎㅇ'];

    for(let i = 0;  i< arr.length; i++)
    {
        if(msg === '안녕' && arr[i] === '안녕')
            replier.reply('안녕하세요 '+ sender +'님?');
        else if(msg === '방가' && arr[i] === '방가')
            replier.reply('방가방가');
    }
}