class API {
    constructor(axios) {
        this.axios = axios;
    }

    async getClientData(leos_id, service) {
        const {
            data: {
                data: {
                    original: {data},
                },
            },
        } = await this.axios.get(`/api/app/getClientData`, {
            params: {leos_id, service},
        });
        return data;
    }

    async getInvoice(leos_id, invoice_id) {
        const {
            data: {
                data: {invoice},
            },
        } = await this.axios.get(`/api/app/getInvoice`, {
            params: {leos_id, invoice_id},
        });
        return invoice;
    }

    async getClientInvoices(leos_id) {
        const {
            data: {
                data: {invoices},
            },
        } = await this.axios.get(`/api/app/getClientInvoices`, {
            params: {leos_id},
        });
        return invoices;
    }

    async getUserInfo(phone, bn_number) {
        const {
            data: {data},
        } = await this.axios.get(`/api/app/getUserInfo`, {
            params: {phone, bn_number},
        });
        return data;
    }

    async getUserValidity(phone, bn_number) {
        try {
            const {data: {success}} = await this.axios.get('/api/app/getUserInfo', {
                params: {phone, bn_number}, headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                }
            });
            return success;
        } catch (e) {
            const {data: {success}} = e.response;
            return success;
        }
    }

    async updateClientAvatar(leos_id, avatar) {
        const formData = new FormData();
        formData.append('leos_id', leos_id);
        formData.append('avatar', {
            uri: avatar.uri,
            type: 'image/jpeg', // or 'image/png'
            name: 'avatar.jpg',
        });

        const res = await this.axios.post(`/api/app/updateClientAvatar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data;
    }

    async getProducts() {
        const {
            data: {
                data: {products},
            },
        } = await this.axios.get(`/api/app/getProducts`);
        return products;
    }

    async login(email, password) {
        const {data} = await this.axios.post(`/api/app/login`, null, {
            params: {email, password},
        });
        return data;
    }
}

export default API;
