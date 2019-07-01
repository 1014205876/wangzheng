public class Division {
    public static void main(String[] args) {
        String str = "192.168.0.1";
        String[] firstArray = str.split("\\.");
        String[] secondArray = str.split("\\.", 2);
        System.out.println(str);
        System.out.println();
        for (String a : firstArray) {
            System.out.println(a);
        }
        System.out.println();
        for (String a : secondArray) {
            System.out.println(a);
        }
    }
}