document.addEventListener('DOMContentLoaded', function() {
    // --- CONFIGURAÇÃO PRINCIPAL DA API ---
    // TROQUE A LINHA ABAIXO PELA SUA URL PÚBLICA DO RENDER.COM QUANDO FOR HOSPEDAR
    const ENDERECO_API = 'http://localhost:3000'; // Para testes locais
    // Exemplo para quando hospedar: const ENDERECO_API = 'https://calculadora-comissao.onrender.com';

    // --- LÓGICA DE AUTENTICAÇÃO (RODA EM TODAS AS PÁGINAS) ---
    const btnCadastrar = document.getElementById('btnCadastrar');
    const btnLogin = document.getElementById('btnLogin');
    const btnSair = document.getElementById('btnSair');

    if (btnCadastrar) {
        btnCadastrar.addEventListener('click', async () => {
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            try {
                const resposta = await fetch(`${ENDERECO_API}/api/auth/cadastro`, { 
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json' }, 
                    body: JSON.stringify({ nome, email, senha }) 
                });
                const dados = await resposta.json();
                if (!resposta.ok) { return alert('Erro no cadastro: ' + (dados.msg || 'Tente novamente.')); }
                alert('Cadastro realizado com sucesso! Você será redirecionado para o login.');
                window.location.href = '/login.html';
            } catch (erro) { alert('Falha de conexão com o servidor.'); }
        });
    }

    if (btnLogin) {
        btnLogin.addEventListener('click', async () => {
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            try {
                const resposta = await fetch(`${ENDERECO_API}/api/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, senha }) });
                const dados = await resposta.json();
                if (!resposta.ok) { return alert('Erro no login: ' + (dados.msg || 'Credenciais inválidas.')); }
                localStorage.setItem('token', dados.token);
                alert('Login bem-sucedido!');
                window.location.href = '/index.html';
            } catch (erro) { alert('Falha de conexão com o servidor.'); }
        });
    }

    if(btnSair) {
        btnSair.addEventListener('click', () => {
            localStorage.removeItem('token');
            alert('Você saiu com sucesso.');
            window.location.href = '/login.html';
        });
    }

    // --- LÓGICA DA CALCULADORA (SÓ RODA SE ESTIVER NO INDEX.HTML) ---
    const seletorPlano = document.getElementById('planoComissao');
    if (seletorPlano) {
        const dadosComissao = [ { "plano": "100% - DILUIDO (11X)", "parcelas": [0.2091, 0.2091, 0.2091, 0.2091, 0.2091, 0.2091, 0.2091, 0.2091, 0.2091, 0.2091, 0.209] }, { "plano": "85% - DILUIDO (11X)", "parcelas": [0.1917, 0.1917, 0.1917, 0.1917, 0.1917, 0.1917, 0.1917, 0.1917, 0.1917, 0.1917, 0.1917, 0.1913] }, { "plano": "70% - DILUIDO (13X)", "parcelas": [0.1769, 0.1769, 0.1769, 0.1769, 0.1769, 0.1769, 0.1769, 0.1769, 0.1769, 0.1769, 0.1769, 0.1769, 0.1772] }, { "plano": "50%-DILUIDO (10X+3X+0,3 15P*)", "parcelas": [0.1288, 0.1288, 0.1288, 0.1288, 0.1288, 0.1288, 0.1288, 0.1288, 0.1288, 0.1288, 0.2374, 0.2374, 0.2372, null, 0.3] }, { "plano": "100%-1%AV(COM1%+10X)", "parcelas": [1.13, 0.13, 0.13, 0.13, 0.13, 0.13, 0.13, 0.13, 0.13, 0.13] }, { "plano": "85%-1%AV(COM1%+11X)", "parcelas": [1.1182, 0.1182, 0.1182, 0.1182, 0.1182, 0.1182, 0.1182, 0.1182, 0.1182, 0.1182, 0.118] }, { "plano": "70%-1%AV(COM1%+13X)", "parcelas": [1.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1] }, { "plano": "50%-1%AV(COM1%+14X)", "parcelas": [1.0929, 0.0929, 0.0929, 0.0929, 0.0929, 0.0929, 0.0929, 0.0929, 0.0929, 0.0929, 0.0929, 0.0929, 0.0929, null, 0.0923] }, { "plano": "100%-1%4X(COM1%4X+10X)", "parcelas": [0.38, 0.38, 0.38, 0.38, 0.13, 0.13, 0.13, 0.13, 0.13, 0.13] }, { "plano": "85%-1%4X(COM1%4X+11X)", "parcelas": [0.3682, 0.3682, 0.3682, 0.3682, 0.1182, 0.1182, 0.1182, 0.1182, 0.1182, 0.1182, 0.118] }, { "plano": "70%-1%4X(COM1%4X+13X)", "parcelas": [0.35, 0.35, 0.35, 0.35, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1] }, { "plano": "50%-1%4X(COM1%4X+14X)", "parcelas": [0.3429, 0.3429, 0.3429, 0.3429, 0.0929, 0.0929, 0.0929, 0.0929, 0.0929, 0.0929, 0.0929, 0.0929, 0.0929, null, 0.0923] }, { "plano": "100%-2%4X(COM2%4X+10X)", "parcelas": [0.53, 0.53, 0.53, 0.53, 0.03, 0.03, 0.03, 0.03, 0.03, 0.03] }, { "plano": "85%-2%4X(2%4X+11X)", "parcelas": [0.5273, 0.5273, 0.5273, 0.5273, 0.0273, 0.0273, 0.0273, 0.0273, 0.0273, 0.0273, 0.027] }, { "plano": "70%-2%4X(COM2%4X+13X)", "parcelas": [0.5231, 0.5231, 0.5231, 0.5231, 0.0231, 0.0231, 0.0231, 0.0231, 0.0231, 0.0231, 0.0231, 0.0231, 0.0228] }, { "plano": "50%-2%4X(2%4X+13X)", "parcelas": [0.5231, 0.5231, 0.5231, 0.5231, 0.0231, 0.0231, 0.0231, 0.0231, 0.0231, 0.0231, 0.0231, 0.0231, null, null, 0.0228] }, { "plano": "PL 50% DILUIDO - COMIS 18X", "parcelas": [0.1111, 0.1111, 0.1111, 0.1111, 0.1111, 0.1111, 0.1111, 0.1111, 0.1111, 0.1111, 0.1111, 0.1111, 0.1111, 0.1111, 0.1111, 0.1111, 0.1111, 0.1113] }, { "plano": "PL SERV RED E LIN 2,3% 13X+15P", "parcelas": [0.1538, 0.1538, 0.1538, 0.1538, 0.1538, 0.1538, 0.1538, 0.1538, 0.1538, 0.1538, 0.1538, 0.1538, 0.1544, null, 0.3] }];
        const TAXA_COMISSAO_VEICULO = 0.01538;
        const PARCELAS_VEICULO = 13;
        
        const saudacaoUsuario = document.getElementById('saudacaoUsuario');
        const inputNomeCliente = document.getElementById('nomeCliente');
        const inputValorVenda = document.getElementById('valorVenda');
        const inputDataVenda = document.getElementById('dataVenda');
        const inputInicioGrupo = document.getElementById('inicioGrupo');
        const radiosTipoVenda = document.querySelectorAll('input[name="tipoVenda"]');
        const grupoPlano = document.getElementById('grupoPlano');
        const inputPercentualImposto = document.getElementById('percentualImposto');
        const btnCalcular = document.getElementById('btnCalcular');
        const btnCancelarEdicao = document.getElementById('btnCancelarEdicao');
        const containerResultados = document.getElementById('containerResultados');
        const corpoTabelaResultados = document.getElementById('corpoTabelaResultados');
        const valorComissaoBruta = document.getElementById('valorComissaoBruta');
        const displayPercentualImposto = document.getElementById('displayPercentualImposto');
        const valorDescontoImposto = document.getElementById('valorDescontoImposto');
        const valorComissaoLiquida = document.getElementById('valorComissaoLiquida');
        const btnSalvar = document.getElementById('btnSalvar');
        const corpoTabelaHistorico = document.getElementById('corpoTabelaHistorico');
        const btnLimparHistorico = document.getElementById('btnLimparHistorico');
        const secaoPrevisao = document.getElementById('secaoPrevisao');
        const btnGerarPrevisaoSimples = document.getElementById('btnGerarPrevisaoSimples');
        const resultadosPrevisao = document.getElementById('resultadosPrevisao');
        const corpoTabelaPrevisao = document.getElementById('corpoTabelaPrevisao');
        const btnGerarPrevisaoDetalhada = document.getElementById('btnGerarPrevisaoDetalhada');
        const resultadosPrevisaoDetalhada = document.getElementById('resultadosPrevisaoDetalhada');
        const cabecalhoPrevisaoDetalhada = document.getElementById('cabecalhoPrevisaoDetalhada');
        const corpoTabelaPrevisaoDetalhada = document.getElementById('corpoTabelaPrevisaoDetalhada');

        let idVendaEmEdicao = null;
        let dadosCalculoAtual = null;
        let vendasEmCache = [];
        const token = localStorage.getItem('token');

        dadosComissao.forEach(item => {
            const option = document.createElement('option');
            option.value = item.plano;
            option.textContent = item.plano;
            seletorPlano.appendChild(option);
        });
        
        async function buscarEExibirDadosUsuario() {
            if (!token) return;
            try {
                const resposta = await fetch(`${ENDERECO_API}/api/auth/me`, {
                    headers: { 'x-auth-token': token }
                });
                if (!resposta.ok) throw new Error('Falha ao buscar dados do usuário');
                const usuario = await resposta.json();
                saudacaoUsuario.textContent = `Olá, ${usuario.nome}!`;
            } catch (erro) {
                console.error(erro);
                saudacaoUsuario.textContent = 'Olá!';
            }
        }

        buscarEExibirDadosUsuario();
        renderizarHistorico();
        
        radiosTipoVenda.forEach(radio => radio.addEventListener('change', alternarSeletorPlano));
        btnCalcular.addEventListener('click', () => {
            if (idVendaEmEdicao) {
                atualizarVenda();
            } else {
                // Apenas executa o cálculo, não salva
                if (executarCalculo()) {
                    containerResultados.classList.remove('hidden');
                }
            }
        });
        btnSalvar.addEventListener('click', salvarNovaVenda);
        btnCancelarEdicao.addEventListener('click', cancelarModoEdicao);
        btnLimparHistorico.addEventListener('click', limparHistorico);
        btnGerarPrevisaoSimples.addEventListener('click', gerarPrevisaoSimples);
        btnGerarPrevisaoDetalhada.addEventListener('click', gerarPrevisaoDetalhada);

        function alternarSeletorPlano() {
            if (document.getElementById('tipoVeiculo').checked) {
                grupoPlano.classList.add('hidden');
            } else {
                grupoPlano.classList.remove('hidden');
            }
        }

        function executarCalculo() {
            const nomeCliente = inputNomeCliente.value.trim();
            const valorVenda = parseFloat(inputValorVenda.value);
            const dataVendaStr = inputDataVenda.value;
            const inicioGrupoStr = inputInicioGrupo.value;
            const tipoVenda = document.querySelector('input[name="tipoVenda"]:checked').value;
            const percentualImposto = parseFloat(inputPercentualImposto.value) || 0;

            if (!nomeCliente) { alert('Por favor, insira o nome do cliente.'); return false; }
            if (isNaN(valorVenda) || valorVenda <= 0) { alert('Por favor, insira um valor de venda válido.'); return false; }
            if (!dataVendaStr) { alert('Por favor, selecione a data da venda.'); return false; }
            
            let valoresComissao;
            let descricaoPlano = '';

            if (tipoVenda === 'imovel') {
                const nomePlanoSelecionado = seletorPlano.value;
                if (!nomePlanoSelecionado) { alert('Por favor, selecione um plano de venda para imóvel.'); return false; }
                descricaoPlano = nomePlanoSelecionado;
                valoresComissao = calcularComissaoImovel(valorVenda, dataVendaStr, inicioGrupoStr, nomePlanoSelecionado, percentualImposto);
            } else {
                descricaoPlano = 'Veicular';
                valoresComissao = calcularComissaoVeiculo(valorVenda, dataVendaStr, inicioGrupoStr, percentualImposto);
            }

            dadosCalculoAtual = {
                nomeCliente: nomeCliente,
                date: dataVendaStr,
                groupStartDate: inicioGrupoStr,
                plan: descricaoPlano,
                value: valorVenda,
                tax: percentualImposto,
                netCommission: valoresComissao.net,
            };
            return true;
        }

        async function salvarNovaVenda() {
            if (idVendaEmEdicao !== null) return;
            if (!executarCalculo()) return;
            
            try {
                const resposta = await fetch(`${ENDERECO_API}/api/vendas`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                    body: JSON.stringify(dadosCalculoAtual)
                });
                if (!resposta.ok) throw new Error('Falha ao salvar a venda');
                alert("Venda salva na nuvem com sucesso!");
                cancelarModoEdicao();
                renderizarHistorico();
            } catch (erro) {
                alert("Erro ao salvar a venda.");
                console.error(erro);
            }
        }
        
        async function atualizarVenda() {
            if (idVendaEmEdicao === null) return;
            if (!executarCalculo()) return;
            
            try {
                const resposta = await fetch(`${ENDERECO_API}/api/vendas/${idVendaEmEdicao}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                    body: JSON.stringify(dadosCalculoAtual)
                });

                if (!resposta.ok) throw new Error('Falha ao atualizar a venda');
                
                alert('Venda atualizada com sucesso!');
                cancelarModoEdicao();
                renderizarHistorico();

            } catch (erro) {
                 alert("Erro ao atualizar a venda.");
                 console.error(erro);
            }
        }
        
        function obterPrimeiraDataPagamento(dataVendaStr, inicioGrupoStr) {
            const dataVenda = new Date(dataVendaStr + 'T12:00:00');
            const diaVenda = dataVenda.getDate();
            let dataPagamentoInicial = new Date(dataVenda.getFullYear(), dataVenda.getMonth() + 1, 1);
            if (diaVenda > 15) { dataPagamentoInicial.setMonth(dataPagamentoInicial.getMonth() + 1); }
            if (inicioGrupoStr) {
                const dataInicioGrupo = new Date(inicioGrupoStr + '-02T12:00:00');
                return dataInicioGrupo > dataPagamentoInicial ? dataInicioGrupo : dataPagamentoInicial;
            }
            return dataPagamentoInicial;
        }

        function exibirResumo(bruto, imposto, liquido, percentualImposto) {
            valorComissaoBruta.textContent = bruto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            displayPercentualImposto.textContent = percentualImposto.toLocaleString('pt-BR');
            valorDescontoImposto.textContent = `- ${imposto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
            valorComissaoLiquida.textContent = liquido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            containerResultados.classList.remove('hidden');
        }

        function calcularComissaoVeiculo(valorVenda, dataVendaStr, inicioGrupoStr, percentualImposto) {
            corpoTabelaResultados.innerHTML = ''; const comissaoBrutaTotal = valorVenda * TAXA_COMISSAO_VEICULO; const parcelaBruta = comissaoBrutaTotal / PARCELAS_VEICULO; const multiplicadorImposto = 1 - (percentualImposto / 100); let dataPagamento = obterPrimeiraDataPagamento(dataVendaStr, inicioGrupoStr); for (let i = 1; i <= PARCELAS_VEICULO; i++) { const parcelaLiquida = parcelaBruta * multiplicadorImposto; const dataExibicao = new Date(dataPagamento); const row = document.createElement('tr'); row.innerHTML = `<td>${i}ª</td><td>${parcelaLiquida.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td><td>${dataExibicao.toLocaleString('pt-BR', { month: 'long', year: 'numeric' }).replace(/^\w/, c => c.toUpperCase())}</td>`; corpoTabelaResultados.appendChild(row); if (i === 1) { dataPagamento.setMonth(dataPagamento.getMonth() + 2); } else { dataPagamento.setMonth(dataPagamento.getMonth() + 1); } } const comissaoLiquidaTotal = comissaoBrutaTotal * multiplicadorImposto; const valorImpostoTotal = comissaoBrutaTotal - comissaoLiquidaTotal; exibirResumo(comissaoBrutaTotal, valorImpostoTotal, comissaoLiquidaTotal, percentualImposto); return { gross: comissaoBrutaTotal, tax: valorImpostoTotal, net: comissaoLiquidaTotal };
        }

        function calcularComissaoImovel(valorVenda, dataVendaStr, inicioGrupoStr, nomePlano, percentualImposto) {
            const planoSelecionado = dadosComissao.find(p => p.plano === nomePlano); if (!planoSelecionado) return { gross: 0, tax: 0, net: 0 }; corpoTabelaResultados.innerHTML = ''; let comissaoBrutaTotal = 0; const multiplicadorImposto = 1 - (percentualImposto / 100); let dataPagamento = obterPrimeiraDataPagamento(dataVendaStr, inicioGrupoStr); let indiceParcelaValida = 0; planoSelecionado.parcelas.forEach((percentual, index) => { if (percentual === null) {return;} const numeroParcela = index + 1; const parcelaBruta = valorVenda * (percentual / 100); comissaoBrutaTotal += parcelaBruta; const parcelaLiquida = parcelaBruta * multiplicadorImposto; const dataExibicao = new Date(dataPagamento); const row = document.createElement('tr'); row.innerHTML = `<td>${numeroParcela}ª</td><td>${parcelaLiquida.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td><td>${dataExibicao.toLocaleString('pt-BR', { month: 'long', year: 'numeric' }).replace(/^\w/, c => c.toUpperCase())}</td>`; corpoTabelaResultados.appendChild(row); if (indiceParcelaValida === 0) { dataPagamento.setMonth(dataPagamento.getMonth() + 2); } else { dataPagamento.setMonth(dataPagamento.getMonth() + 1); } if(percentual > 0) {indiceParcelaValida++;} }); const comissaoLiquidaTotal = comissaoBrutaTotal * multiplicadorImposto; const valorImpostoTotal = comissaoBrutaTotal - comissaoLiquidaTotal; exibirResumo(comissaoBrutaTotal, valorImpostoTotal, comissaoLiquidaTotal, percentualImposto); return { gross: comissaoBrutaTotal, tax: valorImpostoTotal, net: comissaoLiquidaTotal };
        }

        async function renderizarHistorico() {
            corpoTabelaHistorico.innerHTML = '<tr><td colspan="6" style="text-align:center;">Carregando...</td></tr>';
            const vendasSalvas = await carregarVendasDoServidor();
            corpoTabelaHistorico.innerHTML = '';
            
            if (!vendasSalvas || vendasSalvas.length === 0) {
                btnLimparHistorico.classList.add('hidden');
                secaoPrevisao.classList.add('hidden');
                corpoTabelaHistorico.innerHTML = '<tr><td colspan="6" style="text-align:center;">Nenhuma venda salva ainda.</td></tr>';
                return;
            }

            btnLimparHistorico.classList.remove('hidden');
            secaoPrevisao.classList.remove('hidden');

            vendasSalvas.forEach(venda => {
                const dados = venda.dadosVenda;
                if (!dados || typeof dados !== 'object') {
                    console.error("Formato de venda inválido:", venda);
                    return; 
                }
                const row = document.createElement('tr');
                row.setAttribute('onclick', `carregarDetalhesVenda('${venda._id}')`);
                row.setAttribute('title', 'Clique para ver os detalhes desta venda');
                row.innerHTML = `<td>${dados.date ? new Date(dados.date + 'T12:00:00').toLocaleDateString('pt-BR') : 'Inválido'}</td><td>${dados.nomeCliente || 'N/A'}</td><td>${dados.plan || 'N/A'}</td><td>${typeof dados.value === 'number' ? dados.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'Inválido'}</td><td>${typeof dados.netCommission === 'number' ? dados.netCommission.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'Inválido'}</td><td class="botoes-acao"><button class="btn-editar" onclick="iniciarModoEdicao('${venda._id}', event)">Editar</button><button class="btn-excluir" onclick="excluirVenda('${venda._id}', event)">Excluir</button></td>`;
                corpoTabelaHistorico.appendChild(row);
            });
        }
        
        async function carregarVendasDoServidor() {
            try {
                const resposta = await fetch(`${ENDERECO_API}/api/vendas`, { headers: { 'x-auth-token': token } });
                if (!resposta.ok) { if(resposta.status === 401) window.location.href = '/login.html'; throw new Error('Falha ao buscar vendas'); }
                vendasEmCache = await resposta.json();
                return vendasEmCache;
            } catch (erro) { console.error("Erro ao carregar vendas:", erro); return []; }
        }

        window.carregarDetalhesVenda = function(id) {
            if (idVendaEmEdicao !== null && idVendaEmEdicao !== id) { return; }
            const vendaParaCarregar = vendasEmCache.find(v => v._id === id);
            if (vendaParaCarregar) {
                const dados = vendaParaCarregar.dadosVenda;
                inputNomeCliente.value = dados.nomeCliente || '';
                inputValorVenda.value = dados.value;
                inputDataVenda.value = dados.date;
                inputInicioGrupo.value = dados.groupStartDate || '';
                inputPercentualImposto.value = dados.tax || 0;
                if (dados.plan === 'Veicular') { document.getElementById('tipoVeiculo').checked = true; } else { document.getElementById('tipoImovel').checked = true; seletorPlano.value = dados.plan; }
                alternarSeletorPlano();
                executarCalculo(); 
                document.querySelector('.container').scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        window.iniciarModoEdicao = function(id, evento) {
            evento.stopPropagation();
            idVendaEmEdicao = id;
            carregarDetalhesVenda(id);
            btnCalcular.textContent = 'Atualizar Venda';
            btnCancelarEdicao.classList.remove('hidden');
            btnSalvar.disabled = true;
            btnSalvar.title = 'Termine de atualizar a venda atual antes de salvar uma nova.';
        }

        function cancelarModoEdicao() {
            idVendaEmEdicao = null;
            btnCalcular.textContent = 'Calcular Comissão';
            btnCancelarEdicao.classList.add('hidden');
            btnSalvar.disabled = false;
            btnSalvar.title = '';
            inputNomeCliente.value = '';
            inputValorVenda.value = '';
            inputDataVenda.value = '';
            inputInicioGrupo.value = '';
            inputPercentualImposto.value = 0;
            seletorPlano.value = '';
            document.getElementById('tipoImovel').checked = true;
            containerResultados.classList.add('hidden');
        }

        function gerarPrevisaoSimples() {
            resultadosPrevisaoDetalhada.classList.add('hidden');
            const { totaisMensais } = obterDadosPrevisao();
            if (!totaisMensais) return;
            corpoTabelaPrevisao.innerHTML = '';
            const mesesOrdenados = Object.keys(totaisMensais).sort();
            if (mesesOrdenados.length === 0) {
                corpoTabelaPrevisao.innerHTML = '<tr><td colspan="2" style="text-align:center;">Não há recebimentos futuros.</td></tr>';
            } else {
                mesesOrdenados.forEach(chave => {
                    const [ano, mes] = chave.split('-');
                    const nomeMes = new Date(ano, mes - 1, 1).toLocaleString('pt-BR', { month: 'long' });
                    const dataExibicao = `${nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1)} de ${ano}`;
                    const row = document.createElement('tr');
                    row.innerHTML = `<td>${dataExibicao}</td><td>${totaisMensais[chave].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>`;
                    corpoTabelaPrevisao.appendChild(row);
                });
            }
            resultadosPrevisao.classList.remove('hidden');
        }
        
        function gerarPrevisaoDetalhada() {
            resultadosPrevisao.classList.add('hidden');
            const vendasSalvas = vendasEmCache;
            const { totaisMensaisDetalhados } = obterDadosPrevisao();
            if (!totaisMensaisDetalhados) return;
            cabecalhoPrevisaoDetalhada.innerHTML = '';
            corpoTabelaPrevisaoDetalhada.innerHTML = '';
            const headerRow = document.createElement('tr');
            headerRow.innerHTML = '<th>Mês/Ano</th>';
            vendasSalvas.forEach(venda => {
                const dataVenda = new Date(venda.dadosVenda.date + 'T12:00:00').toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit'});
                headerRow.innerHTML += `<th>${venda.dadosVenda.nomeCliente || 'Venda'}<br><small>${dataVenda}</small></th>`;
            });
            headerRow.innerHTML += '<th>Total Mensal</th>';
            cabecalhoPrevisaoDetalhada.appendChild(headerRow);
            const mesesOrdenados = Object.keys(totaisMensaisDetalhados).sort();
            mesesOrdenados.forEach(chave => {
                const dadosMes = totaisMensaisDetalhados[chave];
                const [ano, mes] = chave.split('-');
                const nomeMes = new Date(ano, mes - 1, 1).toLocaleString('pt-BR', { month: 'long' });
                const dataExibicao = `${nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1)} de ${ano}`;
                const row = document.createElement('tr');
                let linhaHTML = `<td>${dataExibicao}</td>`;
                let totalMes = 0;
                vendasSalvas.forEach(venda => {
                    const valorVenda = dadosMes[venda._id] || 0;
                    totalMes += valorVenda;
                    linhaHTML += `<td>${valorVenda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>`;
                });
                linhaHTML += `<td>${totalMes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>`;
                row.innerHTML = linhaHTML;
                corpoTabelaPrevisaoDetalhada.appendChild(row);
            });
            resultadosPrevisaoDetalhada.classList.remove('hidden');
        }
        
        function obterDadosPrevisao() {
            const vendasSalvas = vendasEmCache;
            if (vendasSalvas.length === 0) { return {}; }
            const totaisMensais = {};
            const totaisMensaisDetalhados = {};
            vendasSalvas.forEach(venda => {
                let dataPagamento = obterPrimeiraDataPagamento(venda.dadosVenda.date, venda.dadosVenda.groupStartDate);
                const percentualImposto = venda.dadosVenda.tax || 0;
                const multiplicadorImposto = 1 - (percentualImposto / 100);
                const processarParcela = (parcelaBruta, indice) => {
                    const parcelaLiquida = parcelaBruta * multiplicadorImposto;
                    const chave = `${dataPagamento.getFullYear()}-${String(dataPagamento.getMonth() + 1).padStart(2, '0')}`;
                    totaisMensais[chave] = (totaisMensais[chave] || 0) + parcelaLiquida;
                    if (!totaisMensaisDetalhados[chave]) totaisMensaisDetalhados[chave] = {};
                    totaisMensaisDetalhados[chave][venda._id] = (totaisMensaisDetalhados[chave][venda._id] || 0) + parcelaLiquida;
                    if (indice === 0) { dataPagamento.setMonth(dataPagamento.getMonth() + 2); } else { dataPagamento.setMonth(dataPagamento.getMonth() + 1); }
                };
                if (venda.dadosVenda.plan === 'Veicular') {
                    const parcelaBruta = (venda.dadosVenda.value * TAXA_COMISSAO_VEICULO) / PARCELAS_VEICULO;
                    for (let i = 0; i < PARCELAS_VEICULO; i++) { processarParcela(parcelaBruta, i); }
                } else {
                    const dadosPlano = dadosComissao.find(p => p.plano === venda.dadosVenda.plan);
                    if (dadosPlano) {
                        let indiceParcelaValida = 0;
                        dadosPlano.parcelas.forEach((percentual) => {
                            if(percentual !== null && percentual > 0) {
                                const parcelaBruta = venda.dadosVenda.value * (percentual / 100);
                                processarParcela(parcelaBruta, indiceParcelaValida);
                                indiceParcelaValida++;
                            }
                        });
                    }
                }
            });
            return { totaisMensais, totaisMensaisDetalhados };
        }

        window.excluirVenda = async function(id, evento) {
            evento.stopPropagation();
            if (confirm("Tem certeza que deseja excluir esta venda do histórico?")) {
                try {
                    const resposta = await fetch(`${ENDERECO_API}/api/vendas/${id}`, { method: 'DELETE', headers: { 'x-auth-token': token } });
                    if (!resposta.ok) throw new Error('Falha ao excluir');
                    alert('Venda excluída com sucesso!');
                    renderizarHistorico();
                } catch(erro) { alert('Não foi possível excluir a venda.'); console.error(erro); }
            }
        }

        async function limparHistorico() {
            if (confirm("ATENÇÃO: Isso apagará PERMANENTEMENTE TODAS as suas vendas. Deseja continuar?")) {
                const vendasParaExcluir = [...vendasEmCache];
                try {
                    for(const venda of vendasParaExcluir) {
                        await fetch(`${ENDERECO_API}/api/vendas/${venda._id}`, { method: 'DELETE', headers: { 'x-auth-token': token } });
                    }
                    alert('Histórico limpo com sucesso!');
                    renderizarHistorico();
                } catch(erro) { alert('Erro ao limpar o histórico.'); }
            }
        }
    }
});