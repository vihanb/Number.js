class Num extends Int {
  constructor(str, dec) {
    super(str);
    // this.Num = str
    this.dec = dec.split("");
    this.len = dec.length;
    this.irr = 0; // Irrational numbers
  }
  get val() { return  }
  get _nval() { return this.Num.concat(this.dec) }
  add(i, d) {
    // this.Num = [this.Num, ...this.dec].join("")
    this.Num = this.Num.concat(this.dec);
    let RS = super.Iadd(i + d).Num;

    let RL = RS.length;
    let BL = RL - 0;
    let RD = 0;

    while (RL--) {
      RD = BL - RL;
      if (RD < BL) {
        this.dec[RD] = this.Num.pop();
      }
    }
    return this;
  }
}