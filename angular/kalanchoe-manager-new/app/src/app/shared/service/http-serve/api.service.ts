import { Injectable } from '@angular/core';
import { HttpService } from './http.service'

@Injectable()
export class ApiService {
    prefix = '/api/peak-resource/v1/resource'
    constructor(private http: HttpService) { }
    public applicationEdit(id, params) {
        let url = this.prefix + '/app/' + id
        return this.http.put(url, params)
    }
    public applicationAdd(params) {
        let url = this.prefix + '/app'
        return this.http.post(url, params)
    }
    public applicationSwitch(params) {
        let url = this.prefix + '/app/' + params.id
        return this.http.patch(url, params)
    }
    public getApplication(params) {
        let url = this.prefix + '/appGrid'
        return this.http.get(url, params)
    }
    public getSettings(params) {
        let url = this.prefix + '/settingsDataGrid'
        return this.http.get(url, params)
    }
    public editSetting(id, params) {
        let url = this.prefix + '/settings/' + id
        return this.http.put(url, params)
    }
    public AddSetting(params) {
        let url = this.prefix + '/setting'
        return this.http.post(url, params)
    }
    public deleteSetting(id) {
        let url = this.prefix + '/settings/' + id
        return this.http.delete(url)
    }
    public getRegion() {
        let url = this.prefix + '/region/360000'
        return this.http.get(url)
    }
    public getDepartment() {
        let url = this.prefix + '/department'
        return this.http.get(url)
    }
    public getDepartmentNameAll() {
        let url = this.prefix + '/department/status'
        return this.http.get(url)
    }
    public getEditDepartment(id) {
        let url = this.prefix + '/department/edit?id=' + id
        return this.http.get(url)
    }
    public addDepartment(params) {
        let url = this.prefix + '/department'
        return this.http.post(url, params)
    }
    public editDepartment(params) {
        let url = this.prefix + '/department/' + params.id
        return this.http.put(url, params)
    }
    public changeDepartmentStatus(params) {
        let url = this.prefix + '/department/' + params.id
        return this.http.patch(url, { status: params.status })
    }
    public getEmployees(params) {
        let url = this.prefix + '/user'
        return this.http.get(url, params)
    }
    public resetUserPass(id) {
        let url = this.prefix + '/user/resetpass/' + id
        return this.http.patch(url)
    }
    public getRoleAuth(id) {
        let url = this.prefix + '/role/user/' + id
        return this.http.get(url)
    }
    public editRoleAuth(id, params) {
        let url = this.prefix + '/user/' + id + '/role'
        return this.http.post(url, params)
    }
    public getTask(userId) {
        let url = this.prefix + '/processData/' + userId + '?parentCode=processNode'
        return this.http.get(url)
    }
    public editTask(userId, params) {
        let url = this.prefix + '/processData/' + userId
        return this.http.post(url, params)
    }
    public getUserRegionAuthTree(userId) {
        let url = this.prefix + '/region/' + userId + '/tree'
        return this.http.get(url)
    }
    public editUserSelectArea(userId, params) {
        let url = this.prefix + '/user/' + userId + '/area'
        return this.http.post(url, params)
    }
    public getUserInfo(userId) {
        let url = this.prefix + '/user/' + userId
        return this.http.get(url)
    }
    public changeUserStatus(params) {
        let url = this.prefix + '/user/' + params.id
        return this.http.patch(url, { status: params.status })
    }
    public addUser(params) {
        let url = this.prefix + '/user'
        return this.http.post(url, params)
    }
    public editUser(id, params) {
        let url = this.prefix + '/user/' + id
        return this.http.put(url, params)
    }
    public getApps() {
        let url = this.prefix + '/app'
        return this.http.get(url)
    }
    public getPermissionByAppId(params) {
        let url = this.prefix + '/permission'
        return this.http.get(url, params)
    }
    public addPermission(params) {
        let url = this.prefix + '/permission'
        return this.http.post(url, params)
    }
    public editPermission(params) {
        let url = this.prefix + '/permission/' + params.authId
        return this.http.put(url, params)
    }
    public changePermissionStatus(row) {
        let url = this.prefix + '/permission/' + row.id
        return this.http.patch(url, { status: row.status })
    }
    public getRoleList(params) {
        let url = this.prefix + '/rolesGrid'
        return this.http.get(url, params)
    }
    public editRole(params) {
        let url = this.prefix + '/role/' + params.id
        return this.http.put(url, params)
    }
    public addRole(params) {
        let url = this.prefix + '/role'
        return this.http.post(url, params)
    }
    public changeRoleStatus(row) {
        let url = this.prefix + '/role/' + row.id
        return this.http.patch(url, { status: row.status })
    }
    public getAppRoleAuth(params) {
        let url = this.prefix + '/role/' + params.roleId + '/' + params.appId + '/permission'
        return this.http.get(url)
    }
    public editRoleAuthPermission(params, data) {
        let url = this.prefix + '/role/' + params.roleId + '/' + params.appId + '/permission'
        return this.http.post(url, data)
    }
    public getAreaRegions(params) {
        let url = this.prefix + '/region'
        return this.http.get(url, params)
    }
    public getFieldList(params) {
        let url = this.prefix + '/fieldsDataGrid'
        return this.http.get(url, params)
    }
    public getFieldType() {
        let url = this.prefix + '/dictionaryItem/fieldMangementType'
        return this.http.get(url, {}, true)
    }
    public getFielddictionaryList() {
        let url = this.prefix + '/dictionaries'
        return this.http.get(url, {}, true)
    }
    public addField(params) {
        let url = this.prefix + '/field'
        return this.http.post(url, params)
    }
    public editField(id, data) {
        let url = this.prefix + '/fields/' + id
        return this.http.put(url, data)
    }
    public deleteField(id) {
        let url = this.prefix + '/fields/' + id
        return this.http.delete(url)
    }
    public getModels(params) {
        let url = this.prefix + '/models'
        return this.http.get(url, params)
    }
    public getModelVersion(name) {
        let url = this.prefix + '/versions/models/' + name
        return this.http.get(url)
    }
    public getModelsByVersion(params) {
        let url = this.prefix + '/models/' + params.name + '?version=' + params.version
        return this.http.get(url)
    }
    public getDictionaryList(params) {
        let url = this.prefix + '/dictionary'
        return this.http.get(url, params)
    }
    public editDictionary(params) {
        let url = this.prefix + '/dictionary/' + params.id
        return this.http.put(url, params)
    }
    public addDictionary(params) {
        let url = this.prefix + '/dictionary'
        return this.http.post(url, params)
    }
    public changeDictionaryStatus(params) {
        let url = this.prefix + '/dictionary/' + params.id
        return this.http.patch(url, { status: params.status })
    }
    public getDictionaryItem(id, params) {
        let url = this.prefix + '/dictionary/item/' + id
        return this.http.get(url, params)
    }
    public getIndustryList(params) {
        let url = this.prefix + '/industry'
        return this.http.get(url, params)
    }
    public getStaffs(params) {
        let url = this.prefix + '/staffs'
        return this.http.get(url, params)
    }
    public addStaff(params) {
        let url = this.prefix + '/staff'
        return this.http.post(url, params)
    }
    public editStaff(id, params) {
        let url = this.prefix + '/staffs/' + id
        return this.http.put(url, params)
    }
    public changeStaffStatus(params) {
        let url = this.prefix + '/staffs/' + params.id
        return this.http.patch(url, { status: params.status })
    }
    public getInstitutionList(path, params = {}) {
        let url = this.prefix + '/institutions/' + path
        return this.http.get(url, params)
    }
    public addInstitution(params) {
        let url = this.prefix + '/institution'
        return this.http.post(url, params)
    }
    public editInstitution(params) {
        let url = this.prefix + '/institutions/' + params.id
        return this.http.put(url, params)
    }
    public changeInstitution(params) {
        let url = this.prefix + '/institutions/' + params.id
        return this.http.patch(url, { status: params.status })
    }
    public getProductList(params) {
        let url = this.prefix + '/products'
        return this.http.get(url, params)
    }
    public changeProductStatus(params) {
        let url = this.prefix + '/products/' + params.id
        return this.http.patch(url, { status: params.status })
    }
    public getProductItem() {
        let url = this.prefix + '/productItem'
        return this.http.get(url)
    }
    public addProduct(params) {
        let url = this.prefix + '/product'
        return this.http.post(url, params)
    }
    public getProduct(id) {
        let url = this.prefix + '/products/' + id
        return this.http.get(url)
    }
    public editProduct(id, params) {
        let url = this.prefix + '/products/' + id
        return this.http.put(url, params)
    }
    public getLogs(params) {
        let url = this.prefix + '/logs'
        return this.http.get(url, params)
    }

    public getAppsPermission() {
        let url = this.prefix + '/apps/permission'
        return this.http.get(url)
    }
    public getCurrentUserInfo() {
        let url = this.prefix + '/user/info'
        return this.http.get(url)
    }
    public updatePassword(account, params) {
        let url = this.prefix + '/user/pass/' + account
        return this.http.patch(url, params)
    }
    deleteSysProductExtendSetting(id) {
        let url = this.prefix + '/sysProductExtendSetting/' + id
        return this.http.delete(url)
    }
    addSysProductExtendSetting(params) {
        let url = this.prefix + '/sysProductExtendSetting'
        return this.http.post(url, params)
    }
    editSysProductExtendSetting(id, params) {
        let url = this.prefix + '/sysProductExtendSetting/' + id
        return this.http.put(url, params)
    }
    getSysProductExtendSetting(id, params) {
        let url = this.prefix + '/sysProductExtendSetting/' + id + '/dataGrid'
        return this.http.get(url, params)
    }
    getSysProductMaterial(id, params) {
        let url = this.prefix + '/sysProductMaterial/' + id + '/dataGrid'
        return this.http.get(url, params)
    }
    addSysProductMaterial(params) {
        let url = this.prefix + '/sysProductMaterial'
        return this.http.post(url, params)
    }
    editSysProductMaterial(id, params) {
        let url = this.prefix + '/sysProductMaterial/' + id
        return this.http.put(url, params)
    }
    deleteSysProductMaterial(id) {
        let url = this.prefix + '/sysProductMaterial/' + id
        return this.http.delete(url)
    }
    getSysProductRateSetting(id, params) {
        let url = this.prefix + '/sysProductRateSetting/' + id + '/dataGrid'
        return this.http.get(url, params)
    }
    getSysProductRateSettingMes(id, params) {
        let url = this.prefix + '/sysProductRateSetting/' + id
        return this.http.get(url, params)
    }
    deleteSysProductRateSetting(id) {
        let url = this.prefix + '/sysProductRateSetting/' + id
        return this.http.delete(url)
    }
    addSysProductRateSetting(data) {
        let url = this.prefix + '/sysProductRateSetting'
        return this.http.post(url,data)
    }
    editSysProductRateSetting(id,data) {
        let url = this.prefix + '/sysProductRateSetting/' + id
        return this.http.put(url,data)
    }

}
