public class Opinion {
    public static void main(String args[]) {
        String s1 = new String("abc");
        String s2 = new String("ABC");
        String s3 = new String("abc");
        boolean b1 = s1 == s3;
        boolean b2 = s1.equals(s2);
        boolean b3 = s1.equals(s3);
        boolean b4 = s1.equalslgnoreCase(s2);
        boolean b5 = s1.equalslgnoreCase(s3);
    }
}