# Especificação do dashboard — Verde Vale (fictício)

**Usuário:** sócio-gestor de uma pequena distribuidora de orgânicos por assinatura.
**Decisões que o painel apoia:**
1. Estamos batendo a meta de receita? (ajustar ações comerciais)
2. Quais canais crescem ou caem? (onde investir esforço de venda)
3. O mix de produtos está mudando? (planejar compras com os produtores)
4. Estamos atraindo clientes novos? (avaliar captação do site)

## KPIs

| KPI | Definição | Fórmula | Fonte | Atualização | Responsável |
|---|---|---|---|---|---|
| Receita do mês | Soma do valor dos pedidos no mês fechado | `sum(valor)` | `kpi_mensal` | a cada acesso | Gestor comercial |
| % da meta | Receita sobre a meta mensal | `receita / META_RECEITA_MENSAL` | `kpi_mensal` + `lib/config.ts` | a cada acesso | Gestor comercial |
| Pedidos | Quantidade de pedidos no mês | `count(*)` | `kpi_mensal` | a cada acesso | Operações |
| Ticket médio | Valor médio por pedido | `receita / pedidos` | `kpi_mensal` | a cada acesso | Gestor comercial |
| Pedidos de clientes novos | Pedidos marcados como 1ª compra | `count(*) filter (cliente_novo)` | `kpi_mensal` | a cada acesso | Marketing |
| Receita por canal | Receita do mês por canal de venda | `sum(valor) group by canal` | `vendas_mes_canal` | a cada acesso | Gestor comercial |
| Receita por categoria | Receita do mês por categoria | `sum(valor) group by categoria` | `vendas_mes_categoria` | a cada acesso | Compras |

Todo número tem contexto: comparação com o mês anterior e, na receita, com a meta.
O mês corrente é exibido à parte como **parcial** para não distorcer as comparações.

## Layout por seção

1. **Topo — 4 cards de KPI**: valor, variação vs mês anterior (seta + cor + texto) e detalhe (meta / participação).
2. **Meio — tendência**: linha de receita dos últimos 12 meses fechados com linha tracejada de meta.
3. **Composição**: duas listas de barras horizontais (canal e categoria) com valor, % do total e variação.
4. **Base — tabela**: resultados mês a mês com % da meta destacado quando atingido.

## Por que essas escolhas

- **Linha** para evolução no tempo; **barras horizontais** para comparar categorias com rótulos longos; **tabela** para valores exatos. Sem pizza nem 3D.
- Gráficos em SVG/HTML próprios: zero dependências, carregamento rápido e tabela oculta para leitores de tela.
- Cores da marca com contraste AA; variação nunca depende só da cor (há seta e sinal).
