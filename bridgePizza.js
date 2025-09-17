// 1 - Implementação da Interface de "Tamanho" (Implementor)
class Tamanho {
    constructor(nome, preco) {
        this.nome = nome;
        this.preco = preco;
    }

    getDescricao() {
        return `${this.nome} - R$${this.preco.toFixed(2)}`;
    }

    getPreco() {
        return this.preco;
    }
}

// 1.2 - Implementação dos tamanhos específicos (ConcreteImplementors)
class TamanhoPequeno extends Tamanho {
    constructor() {
        super("Pequena", 30.00);
    }
}

class TamanhoMedia extends Tamanho {
    constructor() {
        super("Média", 45.00);
    }
}

class TamanhoGrande extends Tamanho {
    constructor() {
        super("Grande", 60.00);
    }
}

// 2 - Abstração: Pizza
class Pizza {
    constructor(tamanho) {
        this.tamanho = tamanho;
    }

    setTamanho(tamanho) {
        this.tamanho = tamanho;
    }

    montar() {
        throw new Error("Este método deve ser implementado pelas subclasses");
    }

    calcularPreco() {
        return this.tamanho.getPreco();
    }
}

// 2.2 - Abstrações refinadas (sabores concretos)
class PizzaCalabresa extends Pizza {
    montar() {
        console.log(`Montando pizza de Calabresa (${this.tamanho.getDescricao()})`);
    }
}

class PizzaMussarela extends Pizza {
    montar() {
        console.log(`Montando pizza de Mussarela (${this.tamanho.getDescricao()})`);
    }
}

class PizzaFrangoCatupiry extends Pizza {
    montar() {
        console.log(`Montando pizza de Frango com Catupiry (${this.tamanho.getDescricao()})`);
    }
}

// 3 - Cliente usando o Bridge
const pequena = new TamanhoPequeno();
const media = new TamanhoMedia();
const grande = new TamanhoGrande();

const calabresaPequena = new PizzaCalabresa(pequena);
const mussarelaMedia = new PizzaMussarela(media);
const frangoGrande = new PizzaFrangoCatupiry(grande);

calabresaPequena.montar();
mussarelaMedia.montar();
frangoGrande.montar();

console.log(`Preço calabresa pequena: R$${calabresaPequena.calcularPreco().toFixed(2)}`);
console.log(`Preço mussarela média: R$${mussarelaMedia.calcularPreco().toFixed(2)}`);
console.log(`Preço frango grande: R$${frangoGrande.calcularPreco().toFixed(2)}`);