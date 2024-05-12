@echo off
cd %~dp0

rem Компилируем схему, генерируем r1cs и WASM
circom circuit.circom --r1cs --wasm --sym

rem Запускаем setup для генерации zkey файла
snarkjs groth16 setup circuit.r1cs pot12_final.ptau circuit_0000.zkey

rem Экспортируем verification key
snarkjs zkey export verificationkey circuit_0000.zkey verification_key.json

rem Экспортируем wasm
snarkjs zkey export wasm circuit_0000.zkey circuit.wasm

echo Компиляция завершена
pause
