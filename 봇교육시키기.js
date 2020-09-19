let arr = new Array();

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) 
{
    msg = msg.trim();
    let data = msg.split(" ");

    if(data[0] === '@기억')
    {
        let req = data[1].split(":")[0];
        let res = data[1].split(":")[1];

        arr.push({req,res});

        replier.reply('['+req.trim()+'] 이라고 말하면 ['+res.trim()+'] 이라고 말할께요');
    }

    for(let i = 0; i < arr.length; i++)
    {
        if(msg === arr[i].req)
        {
            replier.reply(arr[i].res);
        }
    }
    
    
    replier.reply(File.getSdcardPath());
}
