/*
const shops = [
    {
        "_id": "5aed7d1a43e52b0014712f49",
        "address": "39 jiefang nan lu, yuexiu ",
        "category": "light ",
        "contact_info": [
            {
                "type": 1,
                "number": "13538713233"
            },
            {
                "type": 2,
                "number": "zjh61102645"
            }
        ],
        "img_links": [
            "https://firebasestorage.googleapis.com/v0/b/fir-imageupload-b88e2.appspot.com/o/shop_images%2F4B8EFE3F-DBBC-4FDA-8768-B80D6EB22C9E.png?alt=media&token=61ba215f-18a2-492c-b8d0-0b7cb8462249",
            "https://firebasestorage.googleapis.com/v0/b/fir-imageupload-b88e2.appspot.com/o/shop_images%2F0D06C03F-669A-47B9-82B8-4F857F92049D.png?alt=media&token=89770722-6e45-48ed-93a1-8ee1e51fc63f",
            "https://firebasestorage.googleapis.com/v0/b/fir-imageupload-b88e2.appspot.com/o/shop_images%2F7E54BEE8-940C-4F62-B7BA-7C8AC4E249D6.png?alt=media&token=7b8eb30e-5d76-4ff1-85f2-32beb0dab83c",
            "https://firebasestorage.googleapis.com/v0/b/fir-imageupload-b88e2.appspot.com/o/shop_images%2F7777DD33-36B2-4AD6-847B-9E973B09A2F7.png?alt=media&token=d8ead0b7-dc68-4e51-b5b8-52165de05639"
        ],
        "market_name": "gift market",
        "name": "Led shop",
        "qr_code": "https://u.wechat.com/MJ2Ypoa_eA3jgYU9cBADtw0",
        "shop_number": "1a043",
        "market_name_lower": "gift market",
        "userId": "5aed0340c3377a0014efd6ca",
        "authorized": "1",
        "authorized_description": ""
    },
    {
        "_id": "5aed825043e52b0014712f4a",
        "address": "38 jiefang nan lu, yuexiu",
        "category": "scent ",
        "contact_info": [
            {
                "type": 1,
                "number": "18933170978"
            }
        ],
        "img_links": [
            "https://firebasestorage.googleapis.com/v0/b/fir-imageupload-b88e2.appspot.com/o/shop_images%2F08F9266E-C07F-4278-930D-03572F416583.png?alt=media&token=31e14435-e158-4e34-baad-61d87f8029fc",
            "https://firebasestorage.googleapis.com/v0/b/fir-imageupload-b88e2.appspot.com/o/shop_images%2FDD1C5F3E-269B-498A-87F9-68E99B79E066.png?alt=media&token=dae6dcd7-408b-4415-9ed8-73d96797b98e",
            "https://firebasestorage.googleapis.com/v0/b/fir-imageupload-b88e2.appspot.com/o/shop_images%2FB7E07617-8258-46D7-9356-2CBBE21DD871.png?alt=media&token=269686cf-1681-4416-a73a-09cea29831c0",
            "https://firebasestorage.googleapis.com/v0/b/fir-imageupload-b88e2.appspot.com/o/shop_images%2F8C65F212-402B-46E8-A1A8-74BC33B68E4F.png?alt=media&token=fa568220-4fdb-43ed-a5b4-5574044a9b67",
            "https://firebasestorage.googleapis.com/v0/b/fir-imageupload-b88e2.appspot.com/o/shop_images%2F84B118C2-DB27-41F4-A274-6507BF3CDC21.png?alt=media&token=669c9d8f-babe-4256-9e0c-bac996de4a5f"
        ],
        "market_name": "Gift Market",
        "name": "Diffuser home scent",
        "qr_code": "http://weixin.qq.com/r/-kj_5mTEDzlwrSCF9x3s",
        "shop_number": "2a036",
        "market_name_lower": "gift market",
        "userId": "5aed0318c3377a0014efd6c9",
        "authorized": "1"
    },
    {
        "_id": "5aed853243e52b0014712f4b",
        "address": "Bayiun world leather trade center, no.1317 jiefang bei road guangzho",
        "category": "bags ",
        "contact_info": [
            {
                "type": 1,
                "number": "13500019300"
            },
            {
                "type": 2,
                "number": "yuko_2a131"
            }
        ],
        "img_links": [
            "https://firebasestorage.googleapis.com/v0/b/fir-imageupload-b88e2.appspot.com/o/shop_images%2FDBD1AE7F-A59C-4729-A1E3-46A78DC2C0B8.png?alt=media&token=7b3c8e7d-26f1-4ab6-8f04-ffcb02b16d46",
            "https://firebasestorage.googleapis.com/v0/b/fir-imageupload-b88e2.appspot.com/o/shop_images%2F1A081126-3567-440D-B3FF-88586753FBF0.png?alt=media&token=94355df2-9d16-4307-a16c-c3d7fd7558d1",
            "https://firebasestorage.googleapis.com/v0/b/fir-imageupload-b88e2.appspot.com/o/shop_images%2F93BD12B5-7FD6-4F36-A93B-F0338EAE6A33.png?alt=media&token=c394c229-d1df-447c-a13b-06c6363b6271",
            "https://firebasestorage.googleapis.com/v0/b/fir-imageupload-b88e2.appspot.com/o/shop_images%2F611E6055-BD67-460E-895B-72C9B12960DF.png?alt=media&token=2f54bc7c-23fc-457b-b4be-1875bd3f4865",
            "https://firebasestorage.googleapis.com/v0/b/fir-imageupload-b88e2.appspot.com/o/shop_images%2F4164BEA6-103D-4B38-A78B-C407C27E0A45.png?alt=media&token=1a64c3bd-d901-497f-be1d-2609696f2fd9",
            "https://firebasestorage.googleapis.com/v0/b/fir-imageupload-b88e2.appspot.com/o/shop_images%2FA832F027-1B61-4D37-8274-A5CB16B3D117.png?alt=media&token=8971fec7-72d6-45ec-8dda-264b24836945"
        ],
        "market_name": "Leather Market",
        "name": "Stella McCartney ",
        "qr_code": "http://tedooo.com",
        "shop_number": "1a139-1",
        "market_name_lower": "leather market",
        "userId": "5aed0318c3377a0014efd6c9",
        "authorized": "1"
    }
];

*/
import {URL} from './apiConstants';

class ShopApi {
    static async getAllShops() {
        try {
            let response = await fetch(
                URL + 'shops/'
            );
            let responseJson = await response.json();
            return responseJson.data;
        } catch (error) {
            return [];
        }

    }

    static async updateReview(review, id, token) {
        let response;
        try {
            response = await fetch(
                URL + 'review/' + id, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify(review)
                }
            );
        } catch (error) {
            throw Error("Couldn't update");
        }
        let responseJson = await response.json();
        if (!response.ok)
            throw Error(responseJson.data.message);
        return responseJson;
    }

    static async postReview(review, token) {
        let response;
        try {
            response = await fetch(
                URL + 'review/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify(review)
                }
            );
        } catch (error) {
            throw Error("Couldn't add");
        }
        let responseJson = await response.json();
        if (!response.ok)
            throw Error(responseJson.data.message);
        return responseJson;
    }

    static async getReviewsForShop(id, userId, page, reqId) {
        try {
            const userIdQuery = (userId && userId.length > 1) ? '&userId=' + userId : '';
            let response = await fetch(
                URL + 'review?shop=' + id + userIdQuery + '&skip=' + (page * 10)
            );
            const json = await response.json();
            json.reqId = reqId;
            return json;
        } catch (error) {
            return [];
        }
    }

    static async findShopById(id) {
        try {
            let response = await fetch(
                URL + 'shops/' + id
            );
            return await response.json();
        } catch (error) {
            return [];
        }
    }

    static async addShop(shop, token) {
        let response;
        try {
            response = await fetch(
                URL + 'shops/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify(shop)
                }
            );
        } catch (error) {
            throw Error("Couldn't add");
        }
        let responseJson = await response.json();
        if (!response.ok)
            throw Error(responseJson.data.message);
        return responseJson;
    }

    static async placeItem(props, token) {
        let response;
        try {
            response = await fetch(
                URL + 'transactions/', {
                    // 'http://localhost:3030/transactions/', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify(props)
                }
            );
        } catch (error) {
            throw Error("Couldn't update");
        }
        let responseJson = await response.json();
        if (!response.ok)
            throw Error(responseJson.data.message);
        return responseJson;
    }

    static async alterShop(id, props, token) {
        let response;
        try {
            response = await fetch(
                URL + 'shops/' + id, {
                    // 'http://localhost:3030/shops/' + id, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify(props)
                }
            );
        } catch (error) {
            throw Error("Couldn't update");
        }
        let responseJson = await response.json();
        if (!response.ok)
            throw Error(responseJson.data.message);
        return responseJson;
    }

    static async deleteShop(id, token) {
        let response;
        try {
            response = await fetch(
                URL + 'shops/' + id, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                }
            );
        } catch (error) {
            throw Error("Couldn't delete");
        }
        let responseJson = await response.json();
        if (!response.ok)
            throw Error(responseJson.data.message);
        return responseJson;
    }

    static async uploadImage(img, token) {
        let data = new FormData();
        data.append("uri", img);
        try {
            const res = await fetch(URL + "upload", {
                method: "POST",
                headers: {
                    'Authorization': token
                },
                body: data
            });
            return await res.json();
        } catch (err) {
            console.log('err', err);
            throw Error('couldn\'t upload image');
        }
    }

    static async changeRating(id, rating, token) {
        let response;
        try {
            response = await fetch(
                URL + 'shops/' + id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify({rating})
                }
            );
        } catch (error) {
            throw Error("Couldn't change rating");
        }
        let responseJson = await response.json();
        if (!response.ok)
            throw Error(responseJson.data.message);
        return responseJson;
    }

    static hasOwnProperty = (props, property) => {
        return Object.prototype.hasOwnProperty.call(props, property);
    };

    static async findShop(props) {
        try {
            let url = '?';
            for (const property in props) {
                // noinspection JSUnfilteredForInLoop
                if (this.hasOwnProperty(props, property)) {
                    if (property === 'id')
                        url = `?_id=${props['id']}`;
                    else if (property === 'userid')
                        url = `?userId=${props['userid']}`;
                    else if (property === 'phoneNumber')
                        url = `?contact_info.number=${props['phoneNumber']}`;
                    else if (property === 'qrCode')
                        url = `?qr_code=${props['qrCode']}`;
                    else
                        url += `&${property}=${props[property]}`;
                }
            }
            let response = await fetch(
                URL + 'shops' + url
            );
            if (response.ok)
                return await response.json();
        } catch (err) {
        }
        return {
            total: 0, skip: 0,
            limit: 10,
            data: []
        };
    }
}

export default ShopApi;