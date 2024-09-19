# Payment form generator for [PMC College](https://pmc.edu.rs/).
The author of this project is not affiliated with PMC College, nor is this project endorsed by them. It was created for personal use and learning, and is not intended for commercial use.
**If you decide to use this tool, please verify the information generated prior to sending any funds! I am not responsible if the information is incorrect, as it is subject to change at any time.**

## Getting Started
Running the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## TODO

1. **Generate NBS IPS QR code**

2. **Generate the full payment form**:
   - Create the form with fields such as:
     - Payment amount
     - Reference number (poziv na broj)
     - Recipient account number
   - Integrate NBS IPS QR code functionality into the payment form.