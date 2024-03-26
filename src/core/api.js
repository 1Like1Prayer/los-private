class API {
    constructor(axios) {
        this.axios = axios;
    }

    async getClientData(leos_id, service) {
        const res = await this.axios.get(`/api/app/getClientData`, {params: {leos_id, service}});
        return res.data;
    }

    async getInvoice(leos_id, invoice_id) {
        const res = await this.axios.get(`/api/app/getInvoice`, {params: {leos_id, invoice_id}});
        return res.data;
    }

    async getClientInvoices(leos_id) {
        const res = await this.axios.get(`/api/app/getClientInvoices`, {params: {leos_id}});
        return res.data;
    }

    async getUserInfo(phone, bn_number) {
        const {data:{data}} = await this.axios.get(`/api/app/getUserInfo`, {params: {phone, bn_number}});
        return data
    }

    async updateClientAvatar(leos_id, avatar) {
        const formData = new FormData()
        formData.append('leos_id', leos_id)
        formData.append('avatar', avatar, 'test.jpg');

        const res = await this.axios.post(`/api/app/updateClientAvatar`, formData);
        return res.data;
    }

    async getProducts() {
        const res = await this.axios.get(`/api/app/getProducts`);
        return res.data;
    }

    async login(email, password) {
        const {data} = await this.axios.post(`/api/app/login`, null, {params: {email, password}});
        return data;
    }
}

export default API;
