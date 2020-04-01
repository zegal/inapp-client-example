
# The App

Welcome to a whole new way to do legal!  This sample client can be downloaded and run so that you can see how easy it is to generate contracts and submit them for signature.

**NOTE:** This sample runs against the DEV (development) and STAGING (QA / Beta) platforms of Zegal.  Contact us at sales@zegal.com for your production API access.

# The Front End API
(Updated as of 3/23/2020; these examples run against the STAGING environment)
The Zegal client API is invoked with these basic steps:
1.  Include this in your HTML:
    ```
        <script src="https://zegal-client.s3.ap-south-1.amazonaws.com/staging/zegal.js"></script>
    ```
2.  Initialize your Zegal client
    ```
    let ZEGAL_KEY = "pk_ad3dcf08-2feb-4de4-8802-9a97d470787f"
    let zegal = new Zegal(ZEGAL_KEY);
    zegal.init();
    ```
3. Set up your payload to generate an NDA
    ```
    let guide =  "5e84cd21ad5b6b5ab785530a";
    let doctype = "5e84e284ad5b6b388085535e";
    let payload = {
        guide, doctype,
        title: "My Title",
        data: {
            partyA: {
                name: "Top Widget Factory",
                tradingName: "Top Widget",
                address: "423 W Main St, Albany, NY, USA"
            },
            partyB: {
                name: "East Coast Distribution",
                tradingName: "East Coast Dist",
                address: "510 W 34th St, New York, NY USA"
            },
            agreement: {
                date: "2020-03-21",
                purpose: "to provide components related to electric scooter rentals"
            }
        }
    }
    let options = {
    }
    ```
4.  Create the document and open the Zegal client plugin
        First, ensure that you have a DIV with an ID of `createModalBody`
        Then add this to trigger the Zegal plugin
    ```
    const doc = await zegal.createDocument(payload, options);
    ```

# Options and other customization elements

(TODO: document initiating a signing sequence, enable/disable options for preview, download, etc, callback hooks)
