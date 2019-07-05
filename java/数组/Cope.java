import java.util.Arrays;

public class Cope {
    public static void main(String args[]) {
        int arr[] = new int[] { 23, 42, 12 };
        int newarr1[] = Arrays.copyOf(arr, 2);
        int newarr2[] = Arrays.copyOfRange(arr, 1, 5);
        System.out.println(newarr1);
        for (int i = 0; i < newarr1.length; i++) {
            System.out.println(newarr1[i]);
        }
        System.out.println(newarr2);
        for (int i = 0; i < newarr2.length; i++) {
            System.out.println(newarr2[i]);
        }
    }
}