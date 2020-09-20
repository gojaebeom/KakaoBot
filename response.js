

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) 
{

    // 인사 관련 함수
    helloMsg(msg, replier, sender);

    // 가위, 바위, 보
    if(msg === '@가위' || msg === '@바위' || msg === '@보')
    {
        rps(msg, replier, sender);
    }

    //봇 강화 게임
    if(msg === '@봇강화')
    {
        Enhance(2, replier);
    }
        
}

function helloMsg(msg, replier, sender)
{
    switch (msg){
        //인사 관련
        case '안녕봇' :
            replier.reply(`왜불러`);
        case '안녕' :
            replier.reply(`안녕하세요, ${sender} 님?`);
            break;
        case '반갑' :
            replier.reply(`습니다`);
            break;
        case 'hello' :
            replier.reply(`world🌏`);
            break;        
        case '야' :
            replier.reply(`뭐`);
            break;
    }
}

function rps(msg, replier, sender)
{
    let rpsArr = ['가위','바위','보'];

    botResult = rpsArr[Math.floor(Math.random()*3)];
    


    if(msg === '@가위' && botResult === '가위' || msg === '@바위' && botResult === '바위' || msg === '@가위' && botResult === '바위')
        replier.reply(botResult+'!'+'\n비겼습니다.');
    if(msg === '@가위' && botResult === '바위' || msg === '@바위' && botResult === '보' || msg === '@보' && botResult === '가위')
        replier.reply(botResult+'!'+'\n제가 이겼습니다.');
    if(msg === '@가위' && botResult === '보' || msg === '@바위' && botResult === '가위' || msg === '@보' && botResult === '바위')
        replier.reply(botResult+'!'+'\n'+sender+'님이 이겼습니다.');
}

function Enhance(newPoint, replier)
{
    random = Math.floor(Math.random()*3);

    let count = (DataBase.getDateBase("강화") === undefined)? 0 : DataBase.getDateBase("강화");
    replier.reply(count);

    if(random === 2)
    {
        count += newPoint;
        DataBase.setDataBase("강화", count);
        replier.reply('강화에 성공하셨습니다![+'+newPoint+']\n안녕봇+'+ point);
    }
        
    if(random === 1)
    {
        count -= newPoint;
        DataBase.setDataBase("강화", count);
        replier.reply('강화에 미끌어졌습니다![-'+newPoint+']\n안녕봇+'+ point);
    }
       
    if(random === 0)
    {
        count = 0;
        DataBase.setDataBase("강화", count);
        replier.reply('봇이 부서졌습니다![-99999]\n안녕봇+'+ point);
    }
        
}

function save(path, fileName, content)
{
    const folder = new java.io.File(path);
    folder.mkdirs();

    const file = new java.io.File(path + fileName);

    const fos = new java.io.FileOutputStream(file);

    const contentString = new java.lang.String(content);

    fos.write(contentString.getBytes());

    fos.close();
}