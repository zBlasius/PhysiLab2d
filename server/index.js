import express from 'express';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());
// * TODO - Fazer middleware para pegar o usuário corretamente

app.get('/list_all_person', (req,res)=>{
  try {
    console.log('entrou aqui')
    return res.json({ok:true});
  } catch (error) {
    console.log('deu ruuim aqui', error)
    return res.status(400).json({error: true, message: ""})
  }
})


app.listen(8000, () => {
  console.log('Server started on port 8000');
});
