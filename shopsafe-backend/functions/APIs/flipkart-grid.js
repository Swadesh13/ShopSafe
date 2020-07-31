exports.extract = (request, response) => {
    if (typeof request.body.invoicePath == "undefined")
        return response.status(400).json({ message: "Please enter correct invoice path" });
    else {
        extract = [
            {
                'sellerName': "ABC Company",
                'sellerID': "ABCDEF123456",
                'sellerState': "Haryana",
                'sellerAddress': "VirtualAddr 255 Street, Lining Town, India",
                'sellerGSTIN': "17ABCDEF123GXYZ",
                'countryOrigin': "India",
                'currency': "INR",
                'description': "Demo Description"
            },
            {
                'invoiceNumber': "1234",
                'invoiceDate': "01-07-2017",
                'dueDate': "10-07-2017",
                'invoiceTotalAmount': "5013400",
                'invoiceTotalQuantity': "1000",
                'PO Number': "3874EVLX",
                'buyerGSTIN': "13WDBCPW159QWP",
                'shippingAddress': "123, Virtual Customer Address, Demo Street, Landmark Town"
            }
        ];
        return response.status(200).json(extract);
    }
}