public class Text {
    public static void main(String args[]) {
        String str = "we are students";
        int size = str.lastIndexOf(" ");// 获取最后一个字符串“ ”的下标
        System.out.println(size);// 6
        System.out.println(str.length());// 获取str的长度 15
    }
}