#include <iostream>
#include <fstream>
using namespace std;

class BankAccount {
public:
    string name;
    int accNumber;
    float balance;

    void createAccount() {
        cout << "Enter Name: ";
        cin >> name;
        cout << "Enter Account Number: ";
        cin >> accNumber;
        balance = 0;

        ofstream file("accounts.txt", ios::app);
        file << accNumber << " " << name << " " << balance << "\n";
        file.close();
        cout << "Account Created Successfully!\n";
    }

    void deposit() {
        int acc;
        float amount;
        cout << "Enter Account Number: ";
        cin >> acc;
        cout << "Enter Amount to Deposit: ";
        cin >> amount;

        ifstream inFile("accounts.txt");
        ofstream outFile("temp.txt");

        bool found = false;
        while (inFile >> accNumber >> name >> balance) {
            if (accNumber == acc) {
                balance += amount;
                found = true;
            }
            outFile << accNumber << " " << name << " " << balance << "\n";
        }

        inFile.close();
        outFile.close();
        remove("accounts.txt");
        rename("temp.txt", "accounts.txt");

        if (found) cout << "Deposit Successful!\n";
        else cout << "Account Not Found!\n";
    }

    void displayAccounts() {
        ifstream file("accounts.txt");
        cout << "Acc No | Name | Balance\n";
        while (file >> accNumber >> name >> balance) {
            cout << accNumber << " | " << name << " | " << balance << "\n";
        }
        file.close();
    }
};

int main() {
    BankAccount bank;
    int choice;
    
    while (true) {
        cout << "\nBank Management System\n";
        cout << "1. Create Account\n2. Deposit Money\n3. View Accounts\n4. Exit\nEnter choice: ";
        cin >> choice;

        if (choice == 1)
            bank.createAccount();
        else if (choice == 2)
            bank.deposit();
        else if (choice == 3)
            bank.displayAccounts();
        else
            break;
    }
    return 0;
}