public class Conver {
    public static void main(String[] ages) {
        byte mybyte = 127;
        int myint = 150;
        float myfloat = 452.121f;
        char mychar = 10;
        double mydouble = 45.46546;
        System.out.println("byte+int=" + (mybyte + myint));
        System.out.println("byte+float=" + (mybyte + myfloat));
        System.out.println("byte+char=" + (mybyte + mychar));
        System.out.println("byte+double=" + (mybyte + mydouble));
        System.out.println("int+float=" + (myint + myfloat));
        System.out.println("int+char=" + (myint + mychar));
        System.out.println("int+double=" + (myint + mydouble));
        System.out.println("float+char=" + (myfloat + mychar));
        System.out.println("float+double=" + (myfloat + mydouble));
        System.out.println("char+double=" + (mychar + mydouble));

    }
}