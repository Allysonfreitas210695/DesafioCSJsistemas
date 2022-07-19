
create table tbProdutos(
   ID SERIAL not null primary key,
   Codigo varchar(20)  unique,
   Descricao varchar(100),
   Grupo varchar(10),
   Preco money
);

drop table tbProdutos;

create table tbClientes(
   CPF varchar(20) unique not null primary key,
   Nome varchar(10) not null,
   Cidade varchar(30) not null,
   Bairro varchar(30) not null
);

drop table tbClientes;

create table tbPedidos(
   ID SERIAL not null primary key,
   Pedido varchar(20),
   DATA date default '2022-07-19',
   ClienteCPF varchar(20) not null,
   foreign key(ClienteCPF) references tbClientes(CPF)
);

drop table tbPedidos;

create table tbPedidosItens(
   PedidoID int not null,
   ProdutoID int not null,
   Qtde int not null,
   Unitario money,
   Desconto money,
   primary key(PedidoID, ProdutoID),
   foreign key(PedidoID) references tbPedidos(ID),
   foreign key(ProdutoID) references tbProdutos(ID)
);

drop table tbPedidosItens;
---------------------- Questao 1 ------------------------
-- 1- Precisamos na nossa tabela de produtos 5 produtos:
---------------------------------------------------------

insert into tbProdutos(Codigo, Descricao, Preco, Grupo)
values ('0001','Produto Teste 01', 30.00, 'CELULARES'),
('0002','Produto Teste 02', 35.00, 'CELULARES'),
('0003','Produto Teste 03', 40.00, 'CAPAS'),
('0004','Produto Teste 04', 45.00, 'CAPAS'),
('0005','Produto Teste 05', 50.00, 'CELULARES')

select * from tbProdutos;



---------------------- Questao 2 ------------------------
-- Inserir um pedido de vendas completo, contendo 10 unidades do Codigo = “0001” e 5
-- unidades do Codigo = “0002”. Colocar no nome do cliente CPF=”0000001”
---------------------------------------------------------

-- criando um cliente 
insert into tbClientes(CPF, Nome, Cidade, Bairro)
values ('0000001','Allyson', 'Portalegre', 'Sitio lajes');

select * from tbClientes;

insert into tbPedidos(Pedido, Data, ClienteCPF) 
values('0001','2022-07-19','0000001');

select * from tbPedidos;

insert  into tbPedidosItens(PedidoID, ProdutoID, Qtde, Unitario, Desconto) 
values (1, 1, 10, (select Preco from tbProdutos where Codigo = '0001'),0);

insert into tbPedidosItens(PedidoID, ProdutoID,Qtde, Unitario, Desconto) 
values (1, 2, 5, (select Preco from tbProdutos where Codigo = '0002'), 0);

select * from tbPedidosItens;

---------------------- Questao 3 ------------------------
-- Inserir um pedido de vendas completo, contendo 10 unidades do Codigo=”0002” e 10
-- unidades do Codigo = “0003”, sendo que neste ultimo item o desconto será de 10% e
-- colocar no nome do cliente CPF = “000002”
---------------------------------------------------------

insert into tbClientes(CPF, Nome, Cidade, Bairro)
values ('0000002','jose', 'Pau dos ferros', 'centro');

select * from tbClientes;

insert into tbPedidos(Pedido,Data, ClienteCPF) 
values ('0002','2022-07-19','0000002');

insert into tbPedidosItens(PedidoID, ProdutoID, Qtde, Unitario, Desconto) 
values (2, 2, 10, (select Preco from tbProdutos where Codigo = '0002'), 0); 

insert into tbPedidosItens(PedidoID,ProdutoID, Qtde, Unitario, Desconto) 
values (2, 3, 10, (select Preco from tbProdutos where Codigo = '0003'), 10);

select * from tbPedidosItens;

---------------------- Questao 4 ------------------------
--Fazer uma pesquisa dos pedidos registrados em um período, contendo os dados:
--Cliente, Nome, Bairro, Cidade, Pedido, data, Codigo, Descricao, Qtde, Unitario,
--Desconto e Total Item
---------------------------------------------------------

select c.CPF, c.Nome, c.Cidade, c.Bairro, ped.Pedido, ped.data, pro.Codigo, pro.Descricao, item.Qtde, item.Unitario, item.Desconto, sum(item.PedidoID) as total
from tbclientes as c, tbpedidos as ped, tbpedidositens as item, tbprodutos as pro 
where ped.ClienteCPF = c.CPF and item.PedidoID = ped.id and  item.PedidoID = pro.id and ped.data >= '2022-07-19' and ped.data <= '2022-08-19'
GROUP BY  c.CPF, c.Nome, c.Cidade, c.Bairro, ped.Pedido, ped.data, pro.Codigo, pro.Descricao, item.Qtde, item.Unitario, item.Desconto;


---------------------- Questao 5 ------------------------
--Fazer uma pesquisa totalizando pedidos em determinado período, com as colunas:
--Data, Pedido, Cliente, Nome, Bairro, Cidade, Qtde Pedidos, Total Bruto, total
--Descontos e Total Liquido
---------------------------------------------------------

select ped.Data, ped.Pedido, c.CPF, c.Nome, c.Bairro, c.Cidade, 
sum(item.Qtde) as quantidade_Pedidos, 
sum(item.Unitario * item.Qtde) as Valor_Bruto,
sum((item.Unitario * (CAST(item.Desconto/100 as numeric))) * item.Qtde) Descontos,
sum((item.Unitario * (1-CAST(item.Desconto/100 as numeric))) * item.Qtde ) Liquido
from tbpedidos as ped
inner join tbclientes c
on ped.ClienteCPF = c.CPF
inner join tbPedidosItens item
ON item.PedidoID = ped.id
inner join tbProdutos pro
on item.ProdutoID = pro.id
where ped.data >= '2022-07-19' and ped.data <= '2022-08-19'
group by ped.data, ped.Pedido, c.CPF, c.Nome, c.Bairro, c.Cidade;

---------------------- Questao 6 ------------------------
-- Fazer uma pesquisa totalizando pedidos de um determinado período, agrupando por
-- DATA, com os campos: Data, Cliente, Cidade, Qtde Pedidos, Total Bruto, total
-- Descontos e Total Liquido
---------------------------------------------------------

select ped.Data, c.Nome, c.Cidade, 
sum(item.Qtde) as quantidade_Pedidos, 
sum(item.Unitario*item.Qtde) as Valor_Bruto,
sum((item.Unitario*(CAST(item.Desconto/100 as numeric))) * item.Qtde) Descontos,
sum((item.Unitario*(1-CAST(item.Desconto/100 as numeric))) * item.Qtde ) Liquido
from tbpedidos as ped
inner join tbclientes c
on ped.ClienteCPF = c.CPF
inner join tbPedidosItens item
ON item.PedidoID = ped.id
inner join tbProdutos pro
ON item.ProdutoID = pro.id
where ped.data >= '2022-07-19' and ped.data <= '2022-08-19'
group by ped.data, c.Nome, c.Cidade;

---------------------- Questao 7 ------------------------
--Fazer uma pesquisa totalizando pedidos de um determinado período, agrupando pelo
--cliente, contendo os campos: Cliente, Cidade, Qtde Pedidos, Total Bruto, total
--Descontos e Total Liquido
---------------------------------------------------------

select  cliente.CPF Cliente, cliente.Cidade,
sum(item.Qtde) as quantidade_Pedidos, 
sum(item.Unitario*item.Qtde) as Valor_Bruto,
sum((item.Unitario*(CAST(item.Desconto/100 as numeric))) * item.qtde) as totalDescontos, 
sum((item.Unitario*(1-CAST(item.Desconto/100 as numeric))) * item.Qtde ) totalLiquido
from tbPedidos ped
inner join tbClientes cliente
ON ped.ClienteCPF = cliente.CPF
inner join tbPedidosItens item
ON item.PedidoID = ped.id
inner join tbProdutos prod
ON item.ProdutoID = prod.id
where ped.data >= '2022-07-19' and ped.data <= '2022-08-19'
GROUP BY cliente;

---------------------- Questao 8 -----------------------------------------------------
--Fazer pesquisa totalizando vendas realizadas por cidade, contendo os campos: Cidade,
--Bairro, Qtde Pedidos, Total Bruto, total Descontos e Total Liquido
----------------------------------------------------------------------------------------

select c.Cidade, c.Bairro, 
sum(item.Qtde) as quantidade_Pedidos, 
sum(item.Unitario*item.Qtde) as Valor_Bruto,
sum((item.Unitario*(CAST(item.Desconto/100 as numeric))) * item.qtde) as totalDescontos, 
sum((item.Unitario*(1-CAST(item.Desconto/100 as numeric))) * item.Qtde ) totalLiquido 
from tbclientes as c, tbpedidos  as ped, tbpedidositens as item, tbprodutos as prod
where ped.ClienteCPF = c.CPF and item.PedidoID = ped.id and  item.PedidoID = prod.id and ped.data >= '2022-07-19' and ped.data <= '2022-08-19'
GROUP BY c.Cidade, c.Bairro;

---------------------- Questao 9 ------------------------
--Fazer pesquisa totalizando vendas realizadas por cidade, contendo os campos: Cidade,
--Bairro, Qtde Pedidos, Total Bruto, total Descontos e Total Liquido
---------------------------------------------------------

select prod.descricao, prod.Grupo, 
sum(item.Qtde) as quantidade_Pedidos, 
sum(item.Unitario*item.Qtde) as Valor_Bruto,
sum((item.Unitario*(CAST(item.Desconto/100 as numeric))) * item.qtde) as totalDescontos, 
sum((item.Unitario*(1-CAST(item.Desconto/100 as numeric))) * item.Qtde ) totalLiquido 
from tbclientes as c, tbpedidos  as ped, tbpedidositens as item, tbprodutos as prod
where ped.ClienteCPF = c.CPF and item.PedidoID = ped.id and  item.PedidoID = prod.id and ped.data >= '2022-07-19' and ped.data <= '2022-08-19'
GROUP by prod.descricao, prod.Grupo;

---------------------- Questao 10 ------------------------

delete from tbPedidosItens where PedidoID = (select ID from tbPedidos where ClienteCPF = '0000002');
delete from tbpedidos where ClienteCPF = (select ClienteCPF from tbPedidos where ClienteCPF = '0000002') ;
DELETE FROM tbClientes WHERE CPF = '0000002';
-- ou para nao fazer isso bastaria na (tbPedidos) ON DELETE SET NULL

---------------------- Questao 11 ------------------------
delete from tbPedidosItens as item
using tbProdutos produto
where produto.Codigo = '0001' and item.produtoID = produto.ID;









