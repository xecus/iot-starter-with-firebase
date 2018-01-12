#include "mbed.h"

Serial pc(SERIAL_TX, SERIAL_RX);
DigitalOut myled(LED1);

volatile unsigned char c = 0x00;
void pc_rx () {
    c = pc.getc();
    pc.putc(c);
}

int main() {
    int i = 0;
    pc.attach(pc_rx, Serial::RxIrq);
    while(1) {
        if (c == '1') {
            myled = 1;
        } else {
            myled = 0;
        }
        pc.printf("loop = %d \r\n", i++);        
    }
}

