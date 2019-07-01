public class Opinion {
    public static void main(String args[]) {
        String s1 = new String("abc");
        String s2 = new String("ABC");
        String s3 = new String("abc");
        boolean b1 = s1 == s3;
        boolean b2 = s1.equals(s2);
        boolean b3 = s1.equals(s3);
        boolean b4 = s1.equalsIgnoreCase(s2);
        boolean b5 = s1.equalsIgnoreCase(s3);
        System.out.println(b1);
        System.out.println(b2);
        System.out.println(b3);
        System.out.println(b4);
        System.out.println(b5);
    }
}