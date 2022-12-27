sudo apt remove --purge python3-apt
sudo apt autoclean
sudo apt install python3-apt
sudo apt install python3.10-distutils
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
sudo python3.10 get-pip.py
rm -rf get-pip.py
