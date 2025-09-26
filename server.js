// server.js (Versão Definitiva com o caminho correto)

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- CORREÇÃO: Removido o '..' para buscar a pasta 'public' na raiz do projeto ---
app.use(express.static(path.join(__dirname, 'public')));


if (!process.env.MONGO_URI) {
    console.error("ERRO FATAL: A variável MONGO_URI não foi definida no arquivo .env");
    process.exit(1);
}
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('>>> SUCESSO: Conectado ao MongoDB Atlas! <<<'))
.catch((err) => console.error('--- ERRO: Falha ao conectar ao MongoDB ---', err));

const UsuarioSchema = new mongoose.Schema({ nome: { type: String, required: true }, email: { type: String, required: true, unique: true, lowercase: true }, senha: { type: String, required: true }, });
const Usuario = mongoose.model('Usuario', UsuarioSchema);
const VendaSchema = new mongoose.Schema({ idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }, dadosVenda: { type: Object, required: true }, });
const Venda = mongoose.model('Venda', VendaSchema);
app.post('/api/auth/cadastro', async (req, res) => { try { const { nome, email, senha } = req.body; if (!nome || !email || !senha) { return res.status(400).json({ msg: 'Por favor, preencha todos os campos.' }); } let usuario = await Usuario.findOne({ email }); if (usuario) { return res.status(400).json({ msg: 'Este email já está cadastrado.' }); } const salt = await bcrypt.genSalt(10); const senhaCriptografada = await bcrypt.hash(senha, salt); usuario = new Usuario({ nome, email, senha: senhaCriptografada }); await usuario.save(); res.status(201).json({ msg: 'Usuário criado com sucesso!' }); } catch (err) { console.error("ERRO na rota de cadastro:", err.message); res.status(500).send('Erro no servidor'); } });
app.post('/api/auth/login', async (req, res) => { try { const { email, senha } = req.body; if (!email || !senha) { return res.status(400).json({ msg: 'Por favor, preencha todos os campos.' }); } const usuario = await Usuario.findOne({ email }); if (!usuario) { return res.status(400).json({ msg: 'Email ou senha inválidos.' }); } const senhaCorreta = await bcrypt.compare(senha, usuario.senha); if (!senhaCorreta) { return res.status(400).json({ msg: 'Email ou senha inválidos.' }); } const payload = { usuario: { id: usuario.id } }; const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' }); res.json({ token }); } catch (err) { console.error("ERRO na rota de login:", err.message); res.status(500).send('Erro no servidor'); } });
const auth = (req, res, next) => { const token = req.header('x-auth-token'); if (!token) { return res.status(401).json({ msg: 'Acesso negado, token não encontrado.' }); } try { const decoded = jwt.verify(token, process.env.JWT_SECRET); req.usuario = decoded.usuario; next(); } catch (err) { res.status(401).json({ msg: 'Token inválido.' }); } };
app.get('/api/auth/me', auth, async (req, res) => { try { const usuario = await Usuario.findById(req.usuario.id).select('-senha'); res.json(usuario); } catch (err) { console.error(err.message); res.status(500).send('Erro no Servidor'); } });
app.get('/api/vendas', auth, async (req, res) => { try { const vendas = await Venda.find({ idUsuario: req.usuario.id }).sort({ 'dadosVenda.date': -1 }); res.json(vendas); } catch (err) { console.error(err.message); res.status(500).send('Erro no servidor'); } });
app.post('/api/vendas', auth, async (req, res) => { try { const novaVenda = new Venda({ idUsuario: req.usuario.id, dadosVenda: req.body, }); await novaVenda.save(); res.status(201).json(novaVenda); } catch (err) { console.error(err.message); res.status(500).send('Erro no servidor'); } });
app.put('/api/vendas/:id', auth, async (req, res) => { try { let venda = await Venda.findById(req.params.id); if (!venda) { return res.status(404).json({ msg: 'Venda não encontrada' }); } if (venda.idUsuario.toString() !== req.usuario.id) { return res.status(401).json({ msg: 'Não autorizado' }); } venda.dadosVenda = req.body; await venda.save(); res.json(venda); } catch (err) { console.error(err.message); res.status(500).send('Erro no servidor'); } });
app.delete('/api/vendas/:id', auth, async (req, res) => { try { const venda = await Venda.findById(req.params.id); if (!venda) { return res.status(404).json({ msg: 'Venda não encontrada' }); } if (venda.idUsuario.toString() !== req.usuario.id) { return res.status(401).json({ msg: 'Não autorizado' }); } await Venda.findByIdAndDelete(req.params.id); res.json({ msg: 'Venda removida com sucesso' }); } catch (err) { console.error(err.message); res.status(500).send('Erro no servidor'); } });

// --- Rota principal também corrigida, sem o '..' ---
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado. Acesse o site em http://localhost:${PORT}`);
});