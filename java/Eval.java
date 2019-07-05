import java.util.Date;

public class Eval {
    public static void main(String[] args) {
        int a, b, c;
        a = 15;
        c = b = a + 4;
        System.out.println(a);
        System.out.println(b);
        System.out.println(c);

        Date date = new Date();
        String year = String.format("%tY", date);
        String month = String.format("%tB", date);
        String day = String.format("%td", date);
        System.out.println(year);
        System.out.println(month);
        System.out.println(day);
    }
}