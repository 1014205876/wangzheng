public class NewStr {
    public static void main(String args[]) {
        String str = "address";
        String newStr = str.replace("a", "A");// 将所有a换成A
        System.out.println(str);// address
        System.out.println(newStr);// Address
    }
}