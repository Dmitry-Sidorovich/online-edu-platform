pragma circom 2.0.0;

include "node_modules/circomlib/circuits/poseidon.circom";

template Main() {
    signal input in;
    signal output out;

    component hasher = Poseidon(2);
    hasher.inputs[0] <== in;
    hasher.inputs[1] <== 0;
    out <== hasher.out[0];
}

component main = Main();
