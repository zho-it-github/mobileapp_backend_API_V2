const voucherifyClient = require('voucherify')

module.exports = {


    check:async function(code){
        try{
            const client = voucherifyClient({
                applicationId: '79c09f6d-6f89-461d-a8a1-40c5e9838627',
                clientSecretKey: '2bf7fc57-0dcb-462b-9c07-c0e6a3ac7365',
                apiUrl: 'https://as1.api.voucherify.io'
            })

            return  await client.vouchers.get(code)
        }catch (e) {
            console.log("error",e)
            return null;
        }


            /*
             {
  id: 'v_GS5ErUpnTyraEfE2g3QFiWcHfFyOAUZj',
  code: '15%OFF-ZKd-D1B',
  campaign: '15% off for Illy - Arabica',
  campaign_id: 'camp_5h0wc453_2',
  category: 'showcase',
  type: 'DISCOUNT_VOUCHER',
  discount: { type: 'PERCENT', percent_off: 15, effect: 'APPLY_TO_ITEMS' },
  gift: null,
  loyalty_card: null,
  start_date: null,
  expiration_date: null,
  validity_timeframe: null,
  validity_day_of_week: null,
  publish: {
    object: 'list',
    count: 0,
    data_ref: 'entries',
    entries: [],
    total: 0,
    url: '/v1/vouchers/15%OFF-ZKd-D1B/publications?page=1&limit=10'
  },
  redemption: {
    object: 'list',
    quantity: null,
    redeemed_quantity: 0,
    data_ref: 'redemption_entries',
    redemption_entries: [],
    total: 0,
    url: '/v1/vouchers/15%OFF-ZKd-D1B/redemptions?page=1&limit=10'
  },
  active: true,
  additional_info: null,
  metadata: {},
  assets: {
    qr: {
      id: 'U2FsdGVkX19urTDEpxAvGpfBnF0umeSH/7G7n8iDegEk9PbjFzQGEQ3BFBcYL66TH1ivUiJgvtE3tWc8J8QOYASaEI7zj84f2IcSe9KeF/FdiZMRiVHLCkHEabrzK8R+pLhBs34uZEvOOJLrYfbn1Agnsk3dd1FGr4NQrrsxUuk=',
      url: 'https://as1.dl.voucherify.io/api/v1/assets/qr/U2FsdGVkX19urTDEpxAvGpfBnF0umeSH%2F7G7n8iDegEk9PbjFzQGEQ3BFBcYL66TH1ivUiJgvtE3tWc8J8QOYASaEI7zj84f2IcSe9KeF%2FFdiZMRiVHLCkHEabrzK8R%2BpLhBs34uZEvOOJLrYfbn1Agnsk3dd1FGr4NQrrsxUuk%3D'
    },
    barcode: {
      id: 'U2FsdGVkX18+cSOlzBO2NfDovL5ettLEBDJ66YksXh4J1tsSJ4OyhHqIEPW+ot6oVISlRRmft2AmomiWAFFFDbpLdEAHlH0a+LEXFNyrn/dHvWOZ25LgP0/a2i8/jxgHOLf30InMVDt2P+XYgwyXMDjyrhwpLy3f0/wrEg0FA1g=',
      url: 'https://as1.dl.voucherify.io/api/v1/assets/barcode/U2FsdGVkX18%2BcSOlzBO2NfDovL5ettLEBDJ66YksXh4J1tsSJ4OyhHqIEPW%2Bot6oVISlRRmft2AmomiWAFFFDbpLdEAHlH0a%2BLEXFNyrn%2FdHvWOZ25LgP0%2Fa2i8%2FjxgHOLf30InMVDt2P%2BXYgwyXMDjyrhwpLy3f0%2FwrEg0FA1g%3D'
    }
  },
  is_referral_code: false,
  updated_at: null,
  created_at: '2021-11-25T13:18:11Z',
  object: 'voucher',
  validation_rules_assignments: { data: [ [Object] ], object: 'list', total: 1, data_ref: 'data' }
}

             */

    },

    redeem:async function(code,customername,amount){
        console.log("redeemd ",code,customername,amount)
        try{
            const client = voucherifyClient({
                applicationId: '79c09f6d-6f89-461d-a8a1-40c5e9838627',
                clientSecretKey: '2bf7fc57-0dcb-462b-9c07-c0e6a3ac7365',
                apiUrl: 'https://as1.api.voucherify.io'
            })
            return  await client.redemptions.redeem(code,{ customer: {
                    name: customername,
                },order: {amount:amount, "items": [ { "product_id": "Zajil", "quantity": 1 } ] } })
        }catch (e) {
            console.log("error",e)
            return false;
        }
    },


}
