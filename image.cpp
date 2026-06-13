#include <bits/stdc++.h>
using namespace std;

extern unsigned char sbox[256];
extern unsigned char invsbox[256];
extern unsigned char mul2[256];
extern unsigned char mul3[256];
extern unsigned char mul9[256];
extern unsigned char mul11[256];
extern unsigned char mul13[256];
extern unsigned char mul14[256];


constexpr int Nb = 4;
constexpr int Nk = 8;
constexpr int Nr = 14;
constexpr int KEY_SIZE = 4 * Nk;
constexpr int EXP_KEY_SIZE = 4 * Nb * (Nr + 1);

extern unsigned char sbox[256];
extern unsigned char invsbox[256];
extern unsigned char Rcon[15];
extern unsigned char mul2[256];
extern unsigned char mul3[256];
extern unsigned char mul9[256];
extern unsigned char mul11[256];
extern unsigned char mul13[256];
extern unsigned char mul14[256];


void KeyExpansion(const unsigned char* key, unsigned char* expKey);
void AES_Encrypt(unsigned char* buf, const unsigned char* key);
void AES_Decrypt(unsigned char* buf, const unsigned char* key);

vector<unsigned char> ReadFile(const string& filename) {
    ifstream file(filename, ios::binary);
    if(!file) {
        cerr << "Error opening input file\n";
        exit(1);
    }

    return vector<unsigned char>((istreambuf_iterator<char>(file)), istreambuf_iterator<char>());
}

void WriteFile(const string& filename, const vector<unsigned char>& data) {
    ofstream file(filename, ios::binary);
    if(!file) {
        cerr << "Error writing output file\n";
        exit(1);
    }
    file.write(reinterpret_cast<const char*>(data.data()), data.size());
}

void PKCS7Pad(vector<unsigned char>& data) {
    size_t pad = 16 - (data.size() % 16);
    if (pad == 0) pad = 16;
    for (size_t i = 0; i < pad; i++) {
        data.push_back((unsigned char)pad);
    }
}

void PKCS7Unpad(vector<unsigned char>& data) {
    if (data.empty()) return;
    unsigned char pad = data.back();
    if (pad > 16) return; 
    data.resize(data.size() - pad);
}

vector<unsigned char> EncryptImage(vector<unsigned char> data, const unsigned char* key) {
    PKCS7Pad(data);
    for (size_t i = 0; i < data.size(); i += 16) {
        AES_Encrypt(&data[i], key);
    }
    return data;
}

vector<unsigned char> DecryptImage(vector<unsigned char> data, const unsigned char* key) {
    for (size_t i = 0; i < data.size(); i += 16) {
        AES_Decrypt(&data[i], key);
    }
    PKCS7Unpad(data);
    return data;
}

int main(int argc, char* argv[]) {
    if (argc < 5) {
        cout << "Usage:\n";
        cout << "encrypt: image.exe encrypt input.png output.enc key\n";
        cout << "decrypt: image.exe decrypt input.enc output.png key\n";
        return 0;
    }

    string mode = argv[1];
    string inputFile = argv[2];
    string outputFile = argv[3];
    string userKey = argv[4];

    unsigned char key[32];
    memset(key, 0, 32);

    for (int i = 0; i < 32 && i < userKey.size(); i++) {
        key[i] = (unsigned char)userKey[i];
    }

    vector<unsigned char> inputData = ReadFile(inputFile);
    vector<unsigned char> outputData;

    if (mode == "encrypt") {
        outputData = EncryptImage(inputData, key);
        cout << "Image encrypted successfully\n";
    }
    else if (mode == "decrypt") {
        outputData = DecryptImage(inputData, key);
        cout << "Image decrypted successfully\n";
    }
    else {
        cout << "Invalid mode. Use encrypt/decrypt\n";
        return 0;
    }

    WriteFile(outputFile, outputData);

    return 0;
}


//Commands:
// Encrypt:
// .\image.exe encrypt input.png enc.bin mykey123
// Decrypt:
// .\image.exe decrypt enc.bin output.png mykey123