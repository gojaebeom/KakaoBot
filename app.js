//파일 저장할 위치
const path = "/storage/emulated/0/katalkbot/db/";

let learnArr = new Array();

//메세지 함수
function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) 
{
    //봇 리로드 : 관리자만 가능
    if(msg === '@boot') bootStrap(replier, true);

    //봇 학습    
    if(msg.indexof('@학습') != -1) botIsLearn(msg, replier);

    //봇 학습 내용 감시, 일치값이 있으면 실행
    if(learnArr.length !== 0) observerStudyData(msg, replier);

    //학습목록 보이기
    if(msg === '@학습목록')
        learnLog(replier);
    


}

function bootStrap(sender, replier , isStart)
{

    if(sender !== '고재범')
    {
        replier.reply('관리자 권한이 없습니다.');
        return false;
    }

    try
    {
        if(isStart)
        {
            Api.off();
            Api.reload();
            Api.on();
            replier.reply('Bot is started');
        }
    }catch(error)
    {
        replier.reply(error);
    }
}

function botIsLearn(msg, replier)
{
    replier.reply('넘어온 문자 : ' + msg);
    let data = msg.substr(3);

    replier.reply('가공한 문자 : ' + data);
    let req = data.split(":")[0];

    let res = data.split(":")[1];

    replier.reply('나눈 문자1 : ' + req);
    replier.reply('나눈 문자2 : ' + res);

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
    let content = '';
    for(let i = 0; i < learnArr.length; i++)
    {
        content += i+". "+replier.reply(learnArr[i].req + " / " + learnArr[i].res)+"\n";
    }
    replier.reply(content);
}



