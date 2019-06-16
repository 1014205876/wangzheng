public class Arith {
    public static void main(String[] args) {
        float number1 = 145.56f;
        int number2 = 4;
        System.out.println(number1 + number2);
        System.out.println(number1 - number2);
        System.out.println(number1 * number2);
        System.out.println(number1 / number2);
        System.out.println(number1 % number2);
        System.out.println(number1 > number2);
        System.out.println(number1 < number2);
        boolean a;
        if (number1 < number2) {
            a = true;
        } else {
            a = false;
        }
        System.out.println(a);

    }
}