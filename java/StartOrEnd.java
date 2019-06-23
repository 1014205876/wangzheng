public class StartOrEnd {
    public static void main(String args[]) {
        String num1 = "22045612";
        String num2 = "21304578";
        boolean b1 = num1.startsWith("22");// num1以"22"开头？
        boolean b2 = num1.endsWith("78");// num1以"78"结尾？
        boolean b3 = num2.startsWith("22");// num2以"22"开头？
        boolean b4 = num2.endsWith("78");// num2以"78"结尾？
        System.out.println(b1);// t
        System.out.println(b2);// f
        System.out.println(b3);// f
        System.out.println(b4);// t
    }
}