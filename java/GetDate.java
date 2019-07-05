import java.util.Date;

public class GetDate {
    public static void main(String[] args) {
        Date date = new Date();
        String hour = String.format("%tH", date);
        String minute = String.format("%tM", date);
        String second = String.format("%tS", date);
        System.out.println(hour);
        System.out.println(minute);
        System.out.println(second);
        System.out.println();
        String time = String.format("%tc", date);
        String form = String.format("%tF", date);
        System.out.println(time);
        System.out.println(form);
    }
}