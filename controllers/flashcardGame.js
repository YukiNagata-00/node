const Food = require("../models/Food")
const User = require("../models/User")
const AddCard = require("../models/AddCard")

const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {
        //const unixTime = new Date().getTime();
        const fileName = `${file.originalname}`
      cb(null, file.originalname)
    }
  })
  const upload = multer({storage});
var path = require('path');

const getStart = (req, res, next) =>{
    res.sendFile(path.join(__dirname, '../public', '/flashcard/flashStart.html'));
}


const getFood =  (req, res) => {
    Food.find({}).sort({ _id: 1 }).exec((err, food) => {
        if (err) {
        console.log(err);
        res.status(500).send({ error: 'An error occurred' });
        }
        res.json(food);
    });
};
const getAddCard =  (req, res) => {
    AddCard.find({}).sort({ _id: 1 }).exec((err, addcard) => {
        if (err) {
        console.log(err);
        res.status(500).send({ error: 'An error occurred' });
        }
        res.json(addcard);
    });
};
const getPlay = (req, res, next) =>{
    res.sendFile(path.join(__dirname, '../public', '/flashcard/flashcard.html'));
}

const addCardpage = (req, res, next) =>{
    res.sendFile(path.join(__dirname, '../public', '/flashcard/addFlashcard.html'));
};
const addCard =
    //body('foodname').isLength({min: 1, max: 25 }).withMessage('食べ物名は１~25文字にしてください'),

    async(req, res) =>{

        try{
            //ユーザーの新規作成
            const add = await AddCard.create(req.body);
            console.log(req.body);
            res.send('カードを追加しました');

        }catch(err){
            return res.status(500).json(err);
        }
    };


    const addImage = async(req, res) =>{
        console.log("addImage")
        try{
            console.log(req.file);
            res.send('ファイルのアップロードが完了しました。');
    
        }catch(error){
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };
   

const updatefavorite = async(req, res) => {
    console.log("test");
    try{
        const id = req.body.userId;
        const foodid = req.body.foodId;
        const user = await User.findById(id);
        console.log(user);

        User.findOneAndUpdate({id: req.body.id},
            {$push:{favorites:foodid.findById(id)}}
        );
        await User.save();
        res.status(200);

    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
   

}



module.exports = {
    getStart,
    //getReady,
    getFood,
    getAddCard,
    getPlay,
    addCardpage,
    // getResult,
    addCard,
    updatefavorite,
    addImage
};