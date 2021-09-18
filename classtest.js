class People{
    abc(){
        return 3
    }

    bcd(){
        console.log(this.abc)
        return 5
    }
}

const p = new People()
console.log(p.bcd)
