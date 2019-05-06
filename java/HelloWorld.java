
public class HelloWorld {
    public HelloWorld(String name){
       System.out.println("小狗的名字是 : " + name ); 
    }

    public static void main(String[] args) {
        HelloWorld myPuppy = new HelloWorld("tommy");
    }
}