//안녕봇 정보
const HelloBot = 
{
    name : "안녕봇",
    birth : "9월 19일",
    hobby : "학습하기"
}

//파일 저장할 위치
const path = "/storage/emulated/0/katalkbot/db/";

//메세지 함수
function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) 
{    
    /* -------------------Default Skill-------------------- */
    if(msg === '안녕' || msg === '안뇽' || msg === '안녕하세요' || msg === 'ㅎㅇ' || msg === 'ㅎ2' || msg === 'ㅎe')
        replier.reply('안녕하세요 '+sender+'님🖐');
    if(msg === '@안녕봇')
        replier.reply(
            '---Bot Property---\n'+
            '이름 : '+HelloBot.name+'\n'+
            '탄생일 : '+HelloBot.birth+'\n'+
            '취미 : '+HelloBot.hobby+'\n'
            );
    if(msg === '@명령어')
        replier.reply(
            '---Bot commandLine---\n'+
            '1. 인사 관련 언어에 반응\n'+
            '기본적으로 [안녕, 안뇽, 안녕하세요, ㅎㅇ, ㅎ2, ㅎe] 에 대해 인사합니다.\n'+
            '2. @안녕봇\n'+
            '[안녕봇]의 정보를 보여줍니다.\n'+
            '3. @boot\n'+
            '[안녕봇]을 재부팅 시킵니다.(관리자 제한)\n'+
            '3. @학습\n'+
            '[안녕봇]에게 대화를 학습시킵니다. 자세한 정보는 [@학습] 명령어를 입력하여 확인하세요.\n'+
            '~ing. 추후에 가위바위보, 업다운 등 여러 게임을 추가할 예정입니다. 필요한 기능들을 추천해주시면 감사하겠습니다.'
            )
    /* -----------------Default Skill end------------------- */


    /* ---------------------Bot Reload--------------------- */
    if(msg === '@boot') 
    {
        if(sender !== '고재범') replier.reply('관리자 권한이 없습니다.');
        else replier.reply(bootStrap()); 
    }
    /* ---------------------Bot Reload end----------------- */



    /* ---------------------Bot Study---------------------- */
    if(msg.indexOf('@학습') !== -1) 
    {
        if(msg === '@학습')
            replier.reply('가르치고자 하는 대화를 [key:value] 의 형태로 저장합니다.\nex) @학습 인사:안녕하세요!\n'
            +'-------------------------\n학습한 내용을 [수정]하고자 할 때는 [키언어]에 덮어쓰면 됩니다.\nex) @학습 인사:[수정할 내용]\n'
            +'-------------------------\n학습한 내용을 [삭제]하고자 할 때는 [키언어]를 비워서 덮어쓰면 됩니다.\nex) @학습 인사:[내용입력 x]');
        else
        {
            let obj = msgDivideUp(msg);
            save(path+"/study-db/", obj.req+".txt" , obj.res);
            if(obj.res === '') replier.reply('[ '+ obj.req +' ] 에 대한 데이터를 삭제하였습니다.');
            else replier.reply('[ '+ obj.req +' ] 이라고 말하면 [ '+ obj.res +' ] (이)라고 답할께요.');
        }
    }
    /* -------------------Bot Study end-------------------- */



    /* -------------study messege Response----------------- */
    let studyMsg =  read(path+"/study-db/", msg+".txt");

    if(studyMsg !== null)
        replier.reply(studyMsg);
    /* -------------study messege Response end------------- */
}

/**
 * @봇_리로드
 */
function bootStrap()
{
    try
    {
        Api.off();
        Api.reload();
        Api.on();

        return '⚙ Bot Is Reloaded ⚙';
    }catch(error)
    {
        return error;
    }
}

/**
 * @메세지_가공하여_나누기
 */
function msgDivideUp(msg)
{
    let data = msg.substr(3);
    let req = data.split(":")[0].trim();
    let res = data.split(":")[1].trim();    

    return {"req":req, "res":res};
}

/**
 * @봇_학습내용_저장
 */
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

/**
 * @봇_학습내용_불러오기
 */
function read(path, fileName)
{
    const file = new java.io.File(path + fileName);

    if(file.exists() == false) return null;

    try
    {
        const fis = new java.io.FileInputStream(file);
        const isr = new java.io.InputStreamReader(fis);
        const br = new java.io.BufferedReader(isr);

        const temp_br = br.readLine();
        const temp_readLine = "";

        while((temp_readLine = br.readLine()) !== null)
        {
            temp_br += "\n" + temp_readLine;
        }
        try
        {
            fis.close();
            isr.close();
            br.close();
            return temp_br;
        }
        catch(e)
        {
            return e;
        }
    }
    catch(e)
    {
        return e;
    }
}