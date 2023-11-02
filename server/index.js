import express from 'express';
import cors from 'cors';
const router = express();

router.use(express.json());
router.use(cors());
// * TODO - Fazer middleware para pegar o usuário corretamente

router.get('/teste', (req,res)=>{
  try {
    console.log('entrou aqui')
    return res.json({ok:true});
  } catch (error) {
    console.log('deu ruuim aqui', error)
    return res.status(400).json({error: true, message: ""})
  }
})


router.listen(8000, () => {
  console.log('Server started on port 8000');
});
