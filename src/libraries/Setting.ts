import {AdsGoogle} from "../models/AdsGoogle";

export class Setting {
    private appName: string;
    private appVersion: string;
    private api: string;
    private countItems: number;
    private countSearch: number;
    private phones: string[] = [];
    private email: string;
    private web: string;
    private AdsGoogle: AdsGoogle;
    private graphql: string;
    private graphqlLocal: string;
    private serverImage: string;
    private logo: string;
    private paypalSuccess: string;
    private paypalCancel: string;
    private paypalIpn: string;
    private apiRoute: string;
    private logoSimple: string;
    private logoSimpleWhite: string;


    constructor() {

    }

    /**
     * Set app name project
     * @param appName
     */
    public setAppName(appName: string): void {
        this.appName = appName
    }

    /**
     * Set app version in project
     * @param version
     */
    public setAppVersion(version: string): void {
        this.appVersion = version;
    }

    public getAppVersion(): string {
        return this.appVersion;
    }

    /**
     * Get app name
     */
    public getAppName(): string {
        return this.appName;
    }

    public setApi(api: string): void {
        this.api = api;
    }

    public getApiRoute(api: string, slash: boolean = true): string {
        return this.api + api + (slash ? "/" : "");
    }

    public setCountItems(count: number): void {
        this.countItems = count;
    }

    public getCountItems(): number {
        return this.countItems;
    }

    addPhone(phone: string): void {
        this.phones.push(phone)
    }

    getPhones(): string[] {
        return this.phones;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    getEmail(): string {
        return this.email;
    }

    setWeb(web: string): void {
        this.web = web;
    }

    getWeb(https: boolean = false): string {
        let protocol = https ? "https://" : "";
        return protocol + this.web;
    }

    setCountSearch(count: number): void {
        this.countSearch = count;
    }

    getCountSearch(): number {
        return this.countSearch;
    }

    getAdsGoogle(): AdsGoogle {
        return this.AdsGoogle;
    }

    setAdsGoogle(ads: AdsGoogle): void {
        this.AdsGoogle = ads;
    }

    setGraphql(uri: string) {
        this.graphql = uri;
    }

    getGraphql() {
        return this.graphql;
    }

    getGraphqlLocal(): string {
        return this.graphqlLocal;
    }

    setGraphqlLocal(graphql: string): void {
        this.graphqlLocal = graphql;
    }

    getApiImages(): string {
        return this.serverImage;
    }

    setApiImages(host: string) {
        this.serverImage = host;
    }

    setLogo(logo: string) {
        this.logo = logo;
    }

    getLogo(): string {
        return this.logo
    }

    getPaypalSuccess(): string {
        return this.paypalSuccess;
    }

    setPaypalSuccess(web: string): void {
        this.paypalSuccess = web;
    }

    getPaypalCancel(): string {
        return this.paypalCancel;
    }

    setPaypalCancel(web: string) {
        this.paypalCancel = web;
    }

    setPaypalIPN(s: string) {
        this.paypalIpn = s;
    }

    getPaypalIPN(): string {
        return this.paypalIpn;
    }

    getApiServer() {
        return this.apiRoute;
    }

    setApiServer(route: string) {
        this.apiRoute = route;
    }

    setLogoSimple(s: string) {
        this.logoSimple = s;
    }

    getLogoSimple(): string {
        return this.logoSimple;
    }

    setLogoSimpleWhite(s: string) {
        this.logoSimpleWhite = s;
    }

    getLogoSimpleWhite(): string {
        return this.logoSimpleWhite;
    }
}
