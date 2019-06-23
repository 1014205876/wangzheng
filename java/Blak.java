public class Blak {
    public static void main(String args[]) {
        String str = "    java       class     ";
        System.out.println(str.length());// 25
        String str2 = str.trim();
        System.out.println(str2);
        System.out.println(str2.length());// 16
    }
}